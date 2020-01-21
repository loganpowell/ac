import { isObject } from "@thi.ng/checks"
import { parse_URL, msTaskDelay } from "../utils"
import {
  __HREF_PUSHSTATE_DOM,
  __NOTIFY_PRERENDER_DOM,
  __SET_LINK_ATTRS_DOM,
  __SET_ROUTER_LOADING_STATE,
  __SET_ROUTER_PATH,
  __SET_PAGE_STATE
} from "../commands"
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
export const __URL__ROUTE = routerCfg => {
  let _router, _pre, _post
  if (isObject(routerCfg)) {
    let { router, pre, post } = routerCfg
    // console.log({ router, pre, post })
    _router = router
    _pre = isObject(pre) ? [pre] : pre || []
    _post = isObject(post) ? [post] : post || []
  } else {
    _router = routerCfg
    _pre = []
    _post = []
  }
  return ({ URL }) => [
    ..._pre, // 📌 enable progress observation
    __SET_ROUTER_LOADING_STATE,
    {
      args: _router(URL),
      reso: (acc, { URL_page, URL_data }) => ({ URL_page, URL_data }),
      erro: (acc, err) =>
        console.warn("Error in __URL__ROUTE:", err, "constructed:", acc)
    },
    { args: parse_URL(URL) },
    __SET_ROUTER_PATH,
    ..._post
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
export const __URL_DOM__ROUTE = routerCfg => {
  // autoscroll view into position
  // scrolly.start()

  // instantiate router
  let match = __URL__ROUTE(routerCfg)

  return ({ URL, DOM }) => [
    { ...__HREF_PUSHSTATE_DOM, args: { URL, DOM } },
    // example Subtask injection
    ({ URL }) => match({ URL }),
    // { args: msTaskDelay(2000) },
    __SET_PAGE_STATE,
    // wait on pending promise(s) w/a non-nullary fn (+)=>
    { ...__SET_ROUTER_LOADING_STATE, args: _ => false },
    // example ad-hoc stream injection
    // { sub$: log$, args: () => ({ DOM }) },
    __SET_LINK_ATTRS_DOM,
    __NOTIFY_PRERENDER_DOM
  ]
}
