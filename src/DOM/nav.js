import { fromDOMEvent, merge } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import { registerCMD } from "../register"
import { parse_href } from "../utils"
import { run$ } from "../streams"
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
}).transform(
  map(x => ({ hurl: x.target.location.href, target: x.currentTarget }))
)

export const hrefToPushState = hurl => {
  history.pushState(parse_href(hurl), null, hurl)
  document.dispatchEvent(new Event("rendered")) //👀 for prerenderer,
}

export const DOMClickEventHandler = e => {
  e.preventDefault()
  let href = e.target.href
  let w_href = window.location.href
  if (w_href === href) return

  hrefToPushState(href)

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

export const stateAtom = new Atom({ path: [] })

const setValue = (path, val) => stateAtom.swap(state => setIn(state, path, val))

export const ROUTER_STATE = registerCMD({
  sub$: "ROUTER_STATE",
  args: x => x,
  handler: ({ data, path }) => setValue(path, data)
})

export const SET_PATH = registerCMD({
  sub$: "SET_PATH",
  args: x => x,
  handler: ({ path }) => setValue("path", path)
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

export const SET_LINK_ATTRS = registerCMD({
  sub$: "SET_LINK_ATTRS",
  args: x => x,
  handler: ({ target }) => setLinkAttrs(target)
})

export const HREF_PUSHSTATE = registerCMD({
  sub$: "HREF_PUSHSTATE",
  args: x => x,
  handler: ({ hurl }) => hrefToPushState(hurl)
})

// export let HREF_NAV$

export const registerDOMRouter = router => {
  return registerCMD({
    sub$: "HREF_NAV$",
    source$: navigated$,
    args: x => x,
    handler: ({ hurl, target }) =>
      run$.next([
        {
          // sub$: "HREF_ROUTER",
          args: router(hurl), // Promise
          erro: (acc, err) => console.warn(err),
          reso: (acc, { state, path }) => ({ state, path })
        },
        {
          sub$: "SET_PATH",
          args: ({ path }) => ({ path })
        },
        {
          sub$: "ROUTER_STATE",
          args: ({ state: { data, spec }, path }) => ({ data, path, spec })
        },
        { sub$: "SET_LINK_ATTRS", args: { target } },
        { args: x => console.log("acc:", x) }
      ])
  })
}
/**
 *
 * preventing a leaky abstration,
 *
 * The route Task takes a router (EquivMap) config that
 * returns data, a path, and spec and executes side-effects.
 *
 * input: config -> returns a Task (function) Task: input ->
 * takes { hurl, target } off of the navigated$ stream
 */
