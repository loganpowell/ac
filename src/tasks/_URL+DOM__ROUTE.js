import { isObject } from "@thi.ng/checks"
import { fURL, msTaskDelay } from "../utils"
import {
  __HREF_PUSHSTATE_DOM,
  __NOTIFY_PRERENDER_DOM,
  __SET_LINK_ATTRS_DOM,
  __SET_STATE
} from "../commands"
import {
  PAGE_TEMPLATE,
  ROUTE_LOADING,
  ROUTE_PATH,
  DOM,
  URL,
  URL_data,
  URL_path,
  URL_page,
  pre,
  post,
  prefix,
  router,
  args,
  reso,
  erro,
  BODY,
  STATE,
  PATH
} from "../store"
// import { log$ } from "../streams"
// import scrolly from "@mapbox/scroll-restorer"

/**
 *
 * `_URL__ROUTE`
 *
 * Universal router (cross-platform) Subtask.
 *
 * This can be used in both a browser and Node context. The
 * parts that handle browser side-effects are included in an
 * Supertask `_URL__ROUTE`
 *
 * Pseudo
 * ```
 * ( router ) => ({ URL }) => [
 * - set `router_loading` path in global atom to `true`
 * - call provided `router` with the `URL` and await payload
 * - `parse_URL(URL)` for `URL_*` components
 * - set `route_path` in global store/atom to current `URL_path`
 * - set page state (data, path & page component name) in store
 * - once promise(s) resolved, set `router_loading` to `false`
 * ]
 * ```
 * reserved Command keys:
 * - `URL_page`
 * - `URL_data`
 * - `URL_path`
 * - `URL`
 * - `DOM`
 */
export const __URL__ROUTE = CFG => {
  let __router, __pre, __post, __prefix
  if (isObject(CFG)) {
    let _router = CFG[router]
    let _pre = CFG[pre]
    let _post = CFG[post]
    let _prefix = CFG[prefix] || null
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g
    const escaped = string => string.replace(escRGX, "\\$&")

    const RGX = _prefix ? new RegExp(escaped(_prefix), "g") : null
    // console.log({ router, pre, post })
    __router = _router
    __pre = isObject(_pre) ? [_pre] : _pre || []
    __post = isObject(_post) ? [_post] : _post || []
    __prefix = RGX
  } else {
    __router = CFG
    __pre = []
    __post = []
    __prefix = null
  }
  return ({ URL }) => [
    ...__pre, // 📌 enable progress observation
    /**
     * ## `_SET_ROUTER_LOADING_STATE`cod
     *
     * Routing Command: Universal
     *
     * ### Payload: static
     * default payload `args` signature:
     * ```
     * args: true,
     * ```
     * Simple true or false payload to alert handler
     *
     * ### Handler: side-effecting
     * Sets `route_loading` path in global Atom to true || false
     *
     */
    {
      [args]: __prefix ? __router(URL.replace(__prefix, "")) : __router(URL),
      [reso]: (acc, res) => ({
        [URL_page]: res[URL_page],
        [URL_data]: res[URL_data]
      }),
      [erro]: (acc, err) =>
        console.warn("Error in __URL__ROUTE:", err, "constructed:", acc)
    },
    { [args]: __prefix ? fURL(URL, __prefix) : fURL(URL) },
    /**
     * ## `_SET_ROUTER_PATH`
     *
     * Routing Command: Universal
     *
     * ### Payload: function
     * default payload `args` signature:
     * ```
     * args: ({ URL_path }) => ({ URL_path }),
     * ```
     * Consumes the `URL_path` property from a `parse_URL`
     * object, handed off from a prior Command
     *
     * ### Handler: side-effecting
     * Sets the current/loading router's `route_path` in the
     * global Atom
     *
     */
    {
      ...__SET_STATE,
      args: acc => ({
        [STATE]: acc[URL_path],
        [PATH]: [ROUTE_PATH]
      })
    },
    ...__post
  ]
}

/**
 *
 * `_URL__ROUTE_DOM`
 *
 * DOM Router that contains a cross-platform routing Subtask
 * `_URL__ROUTE`
 *
 *
 * Subtask HOF for router registration. Takes a
 * `@thi.ng/associative` `EquivMap` route matching function,
 * registers that router as a member of a Task for following
 * Commands to leverage the returned data (`{ data, page }`)
 *
 * Pseudo
 * ```
 * ( router ) => ({ URL, DOM event }) => [
 * - if href, push to `history.pushState`
 * - SUBTASK: _URL__ROUTE (universal router)
 * - remove `active` attribute from visited links except current
 * - notify rendertron (TBD) of new page
 * ]
 * ```
 *
 * reserved Command keys:
 * - `URL`
 * - `DOM`
 * - `URL_page`
 * - `URL_path`
 * - `URL_data`
 */
export const __URL_DOM__ROUTE = CFG => {
  // autoscroll view into position
  // scrolly.start()

  // instantiate router
  let match = __URL__ROUTE(CFG)

  return acc => [
    {
      ...__SET_STATE,
      args: {
        [PATH]: [ROUTE_LOADING],
        [STATE]: true
      }
    },
    { ...__HREF_PUSHSTATE_DOM, args: { [URL]: acc[URL], [DOM]: acc[DOM] } },
    // example Subtask injection
    acc => match({ [URL]: acc[URL] }),
    // { args: msTaskDelay(2000) },
    /**
     * takes the result from two sources: the user-provided
     * `router` ([@thi.ng/associative:
     * EquivMap](http://thi.ng/associative)) and the `URL_path`
     * from `parse_URL(URL)`
     *
     * ### Handler: side-effecting
     * Hydrates the page state as well as the name of the active
     * page in the global store
     *
     */
    {
      ...__SET_STATE,
      args: acc => ({
        [PATH]: [PAGE_TEMPLATE],
        [STATE]: acc[URL_page]
      })
    },
    {
      ...__SET_STATE,
      args: acc => ({
        [PATH]: acc[URL_path],
        [STATE]: acc[URL_data][BODY] || acc[URL_data]
      })
    },
    // wait on pending promise(s) w/a non-nullary fn (+)=>

    // { ...__SET_ROUTER_LOADING_STATE, args: _ => false },
    // example ad-hoc stream injection
    // { sub$: log$, args: () => ({ DOM }) },
    __SET_LINK_ATTRS_DOM,
    {
      ...__SET_STATE,
      args: _ => ({
        [PATH]: [ROUTE_LOADING],
        [STATE]: false
      })
    },
    __NOTIFY_PRERENDER_DOM
  ]
}
