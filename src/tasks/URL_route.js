import { parse_URL, delay } from "../utils"
import { run$, log$ } from "../streams"

/**
 *
 * `URL__ROUTE_DOM`
 *
 * DOM Router that contains a cross-platform Subtask Router `URL__ROUTE`
 * Pseudo
 *
 * Subtask:
 * ```
 * - input         => { href }
 * - href_query    => { path, query }  : parse_href
 * - query_match   => { match }        : EquivMap
 * - query_auth    => Promise { auth } : ? API
 * - auth_data     => Promise { data } : ? API
 * - FLIP          => 0                : side-effect
 * - query_URL     => { route }        : side-effect
 * - datapath_head => { path, data }   : Atom$ -> <head>
 * - datapath_body => { path, data }   : Atom$ -> UI render!
 * - FLIP          => 1                : side-effect
 * ```
 *
 */
export const URL__ROUTE_DOM = router => ({ URL, DOM }) => [
  { sub$: "_HREF_PUSHSTATE", args: { URL, DOM } },
  ({ URL }) => URL__ROUTE(router, { URL }),
  // example ad-hoc stream injection
  // { sub$: log$, args: () => ({ DOM }) },
  { sub$: "_SET_LINK_ATTRS", args: { DOM } },
  { sub$: "_NOTIFY_PRERENDER", args: true }
]

/**
 *
 * `URL__ROUTE`
 *
 * Universal router (cross-platform) Subtask.
 *
 * This can be used in both a browser and Node context. The parts that handle browser side-effects are included in an Supertask `URL__ROUTE`
 *
 */
export const URL__ROUTE = (router, { URL }) => [
  { sub$: "_SET_ROUTER_LOADING_STATE", args: true },
  {
    args: router(URL),
    reso: (acc, { page, data }) => ({ page, data }),
    erro: (acc, err) => console.warn(err)
  },
  // inject a delay
  // { args: delay(100) },
  { args: parse_URL(URL) },
  { sub$: "_SET_ROUTER_PATH", args: ({ URL_path }) => ({ URL_path }) },
  {
    sub$: "_SET_ROUTER_STATE",
    args: ({ URL_path, page, data }) => ({ data, URL_path, page })
  },
  // if you need to wait on any pending promises, use a unary function
  { sub$: "_SET_ROUTER_LOADING_STATE", args: _ => false }
]
