import { fromDOMEvent, merge, stream, trace } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import { registerCMD } from "../src/register"
import { parse_URL, discard$ } from "../src/utils"
import { run$, task$, out$, command$, cancel$ } from "../src/streams"
import { setIn } from "@thi.ng/paths"
import { Atom } from "@thi.ng/atom"

export const popstate$ = fromDOMEvent(window, "popstate")
export const DOMContentLoaded$ = fromDOMEvent(window, "DOMContentLoaded")

/**
 *
 * There are three types of navigation we need to handle:
 * 1. DOMContentLoaded (entering the site) events
 * 2. popstate (browser back/forward button clicks) events
 * 3. <a hurl="x"> (link clicking)
 *
 * These events have different payloads and need to be
 * harmonized in order to use them consistently
 *
 * ## getting the `hurl` property from the various events:
 * 1. ev.target.location.hurl
 * 2. ev.target.location.hurl
 * 3. ev.target.hurl
 *
 * for raw events, we can just transform them, but for link
 * clicking we need to convert/wrap it to align with the
 * destructuring of the others
 */
export const navigated$ = merge({
  src: [popstate$, DOMContentLoaded$]
}).transform(map(x => ({ URL: x.target.location.href, DOM: x.currentTarget })))

export const hrefToPushState = URL => {
  history.pushState(parse_URL(URL), null, URL)
}

export const DOMClickEventHandler = e => {
  e.preventDefault()
  let href = e.target.href
  let w_href = window.location.href
  if (w_href === href) return

  /**
   * we need to transform the payload to align with the
   * object structure of the native DOM events ('popstate'
   * and 'DOMContentLoaded') payloads, so they're
   * transformed correctly by the `navigated$` stream
   * transforms
   */
  navigated$.next({
    target: { location: { href } },
    currentTarget: e.currentTarget
  })
  return e
}

// source = TRIGGER

export const stateAtom = new Atom({ route_path: [], route_loading: false })

const setValue = (path, val) => stateAtom.swap(state => setIn(state, path, val))

export const _SET_ROUTER_STATE = registerCMD({
  sub$: "_SET_ROUTER_STATE",
  args: x => x,
  // path: [],
  handler: ({ data, URL_path }) => setValue(URL_path, data)
})

export const _SET_ROUTER_LOADING_STATE = registerCMD({
  sub$: "_SET_ROUTER_LOADING_STATE",
  args: x => x,
  handler: x => setValue("route_loading", x)
})

export const _SET_ROUTER_PATH = registerCMD({
  sub$: "_SET_ROUTER_PATH",
  args: x => x,
  handler: ({ URL_path }) => setValue("route_path", URL_path)
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
  handler: ({ URL, DOM }) => (!DOM.document ? hrefToPushState(URL) : null)
})

export const _NOTIFY_PRERENDER = registerCMD({
  sub$: "_NOTIFY_PRERENDER",
  args: x => x,
  handler: () => document.dispatchEvent(new Event("rendered")) //👀 for prerenderer,
})
// export let HREF_NAV$

// example of custom stream dispatch (logging)
const log$ = stream().subscribe(trace("log$ -> "), { id: "log$" })

const delay = t => new Promise(resolve => setTimeout(resolve, t))

export const loading = stateAtom.addView("route_loading")

export const registerDOMRouter = router => {
  console.log("DOM Router Registered")

  return registerCMD({
    sub$: "_URL_NAVIGATED$",
    source$: navigated$,
    args: x => x,
    handler: ({ URL, DOM }) =>
      run$.next([
        { sub$: "_SET_ROUTER_LOADING_STATE", args: true },
        { sub$: "_HREF_PUSHSTATE", args: { URL, DOM } },
        {
          args: router(URL),
          reso: (acc, { page, data }) => ({ page, data }),
          erro: (acc, err) => console.warn(err)
        },
        { args: delay(100) },
        { args: parse_URL(URL) },
        { sub$: "_SET_ROUTER_PATH", args: ({ URL_path }) => ({ URL_path }) },
        {
          sub$: "_SET_ROUTER_STATE",
          args: ({ URL_path, page, data }) => ({ data, URL_path, page })
        },
        { sub$: "_SET_ROUTER_LOADING_STATE", args: _ => false },
        // example ad-hoc stream injection
        { sub$: log$, args: () => ({ DOM }) },
        { sub$: "_SET_LINK_ATTRS", args: { DOM } },
        { sub$: "_NOTIFY_PRERENDER", args: true }
      ])
  })
}
