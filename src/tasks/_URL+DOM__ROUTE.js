import { isNode } from "@thi.ng/checks"
import { parse_URL, msTaskDelay } from "../utils"
import {
  _HREF_PUSHSTATE_DOM,
  _NOTIFY_PRERENDER_DOM,
  _SET_LINK_ATTRS_DOM,
  _SET_ROUTER_LOADING_STATE,
  _SET_ROUTER_PATH,
  _SET_PAGE_STATE
  // _FLIP_FIRST,
  // _FLIP_PLAY
} from "../commands"
// import { log$ } from "../streams"

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
 */
export const _URL_DOM__ROUTE = router => {
  // instantiate router
  let match = _URL__ROUTE(router)
  return ({ URL, DOM }) => [
    { ..._HREF_PUSHSTATE_DOM, args: { URL, DOM } },
    // example Subtask injection
    ({ URL }) => match({ URL }),
    // { args: msTaskDelay(2000) },
    // _FLIP_FIRST,
    _SET_PAGE_STATE,
    // _FLIP_PLAY,
    // wait on pending promise(s) w/a non-nullary fn (+)=>
    { ..._SET_ROUTER_LOADING_STATE, args: _ => false },
    // example ad-hoc stream injection
    // { sub$: log$, args: () => ({ DOM }) },
    _SET_LINK_ATTRS_DOM,
    _NOTIFY_PRERENDER_DOM
  ]
}

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
 */
export const _URL__ROUTE = router => ({ URL }) => [
  _SET_ROUTER_LOADING_STATE,
  {
    args: router(URL),
    reso: (acc, { page, data }) => ({ page, data }),
    erro: (acc, err) => console.warn(err)
  },
  { args: parse_URL(URL) },
  _SET_ROUTER_PATH
]
