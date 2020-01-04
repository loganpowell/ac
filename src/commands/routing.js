import { registerCMD } from "../register"
import { setState } from "../store"
import { parse_URL } from "../utils"
import { navigated$ } from "../streams"

/**
 * we need to transform the payload to align with the
 * object structure of the native DOM events ('popstate'
 * and 'DOMContentLoaded') payloads, so they're
 * transformed correctly by the `navigated$` stream
 * transforms
 */
export const clickEventHandlerDOM = e => {
  e.preventDefault()
  let href = e.target.href
  let w_href = window.location.href
  if (w_href === href) return

  navigated$.next({
    target: { location: { href } },
    currentTarget: e.currentTarget
  })
  return e
}

// source = TRIGGER

export const _SET_ROUTER_STATE = registerCMD({
  sub$: "_SET_ROUTER_STATE",
  args: x => x,
  handler: ({ data, URL_path }) => setState(URL_path, data)
})

export const _SET_ROUTER_LOADING_STATE = registerCMD({
  sub$: "_SET_ROUTER_LOADING_STATE",
  args: x => x,
  handler: x => setState("route_loading", x)
})

export const _SET_ROUTER_PATH = registerCMD({
  sub$: "_SET_ROUTER_PATH",
  args: x => x,
  handler: ({ URL_path }) => setState("route_path", URL_path)
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

export const _SET_LINK_ATTRS = registerCMD({
  sub$: "_SET_LINK_ATTRS",
  args: x => x,
  handler: ({ DOM }) => setLinkAttrs(DOM)
})

export const _HREF_PUSHSTATE = registerCMD({
  sub$: "_HREF_PUSHSTATE",
  args: x => x,
  handler: ({ URL, DOM }) =>
    !DOM.document ? history.pushState(parse_URL(URL), null, URL) : null
})

export const _NOTIFY_PRERENDER = registerCMD({
  sub$: "_NOTIFY_PRERENDER",
  args: x => x,
  handler: () => document.dispatchEvent(new Event("rendered")) //👀 for prerenderer,
})
// export let HREF_NAV$
