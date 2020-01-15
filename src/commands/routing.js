import { registerCMD } from "../register"
import { set$State, set$Route, set$Loading, set$Page, $store$ } from "../store"
import { parse_URL } from "../utils"
import { DOMnavigated$ } from "../streams"

/**
 * we need to transform the payload to align with the
 * object structure of the native DOM events ('popstate'
 * and 'DOMContentLoaded') payloads, so they're
 * transformed correctly by the `navigated$` stream
 * transforms
 */
export const HURL = e => {
  e.preventDefault()
  // console.log({ e })
  let href = e.target.href
  let w_href = window.location.href
  if (w_href === href) return

  DOMnavigated$.next({
    target: { location: { href } },
    currentTarget: e.currentTarget
  })
  return e
}

// source = TRIGGER

/**
 * ## `_SET_PAGE_STATE`
 *
 * Routing Command: Universal
 *
 * ### Payload: function
 * default payload `args` signature:
 * ```
 * args: ({ URL_path, URL_page, URL_data }) => ({ URL_path, URL_page, URL_data }),
 * ```
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
export const __SET_PAGE_STATE = registerCMD({
  sub$: "__SET_PAGE_STATE",
  args: ({ URL_path, URL_page, URL_data }) => ({
    URL_path,
    URL_page,
    URL_data
  }),
  handler: ({ URL_path, URL_page, URL_data }) => {
    // 📌 remove ["home"] and just match for empty path in
    // router EquivMap
    let path = URL_path.length === 0 ? ["home"] : URL_path
    set$State(path, URL_data), set$Page(URL_page)
  }
})

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
export const __SET_ROUTER_LOADING_STATE = registerCMD({
  sub$: "__SET_ROUTER_LOADING_STATE",
  args: true,
  handler: x => set$Loading(x)
})

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
export const __SET_ROUTER_PATH = registerCMD({
  sub$: "__SET_ROUTER_PATH",
  args: ({ URL_path }) => ({ URL_path }),
  handler: ({ URL_path }) => set$Route(URL_path)
})

const setLinkAttrs = target => {
  document.body.querySelectorAll("a[visited]").forEach(el => {
    if (el.href === window.location.href) el.setAttribute("active", "")
    else el.removeAttribute("active")
  })
  if (target.setAttribute) {
    target.setAttribute("visited", "")
    target.setAttribute("active", "")
  }
}

/**
 * ## `_SET_LINK_ATTRS_DOM`
 *
 * Routing Command: DOM-specific
 *
 * ### Payload: function
 * default payload `args` signature:
 * ```
 * args: ({ DOM }) => ({ DOM }),
 * ```
 * Input = DOM node reference
 *
 * ### Handler: side-effecting
 * Takes a DOM reference and queries all visited links. Sets
 * current/clicked link as active and sets visted links that
 * don't match current URL to inactive see `setLinkAttrs`
 * function
 *
 */
export const __SET_LINK_ATTRS_DOM = registerCMD({
  sub$: "__SET_LINK_ATTRS_DOM",
  args: ({ DOM }) => ({ DOM }),
  handler: ({ DOM }) => setLinkAttrs(DOM)
})

/**
 * ## `_HREF_PUSHSTATE_DOM`
 *
 * Routing Command: DOM-specific
 *
 * ### Payload: function
 * default payload `args` signature:
 * ```
 * args: ({ URL, DOM }) => ({ URL, DOM }),
 * ```
 * Takes a URL and a DOM reference
 *
 * ### Handler: side-effecting
 * If the DOM reference is an `<a>` element, uses
 * `history.pushState` to add the clicked URL (plus the
 * parsed URL from `parse_URL(URL)`) to the `history` object
 *
 * export const DOMnavigated$ = merge({
 *   src: [popstate$, DOMContentLoaded$]
 * }).transform(map(x => ({ URL: x.target.location.href, DOM: x.currentTarget })))
 *
 *
 */
export const __HREF_PUSHSTATE_DOM = registerCMD({
  sub$: "__HREF_PUSHSTATE_DOM",
  args: ({ URL, DOM }) => ({ URL, DOM }),
  handler: ({ URL, DOM }) =>
    !DOM.document ? history.pushState(parse_URL(URL), null, URL) : null
})

/**
 * ## `_NOTIFY_PRERENDER_DOM`
 *
 * ### Payload: static
 * default payload `args` signature
 * ```
 * args: true,
 * ```
 * ### Handler: side-effecting
 * Routing Command: DOM-specific (used for manually
 * triggering `rendertron` prerenderer for bots/web-crawlers
 *
 *
 */
export const __NOTIFY_PRERENDER_DOM = registerCMD({
  sub$: "__NOTIFY_PRERENDER_DOM",
  args: true,
  //👀 for prerenderer,
  handler: () => document.dispatchEvent(new Event("rendered"))
})
