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
 * 3. <a href="x"> (link clicking)
 *
 * These events have different payloads and need to be
 * harmonized in order to use them consistently
 *
 * ## getting the `href` property from the various events:
 * 1. ev.target.location.href
 * 2. ev.target.location.href
 * 3. ev.target.href
 *
 * for raw events, we can just transform them, but for link
 * clicking we need to convert/wrap it to align with the
 * destructuring of the others
 */
export const navigated$ = merge({
  src: [popstate$, DOMContentLoaded$]
}).transform(
  map(x => ({ href: x.target.location.href, target: x.currentTarget }))
)

export const hrefToPushState = href => {
  history.pushState(parse_href(href), null, href)
  document.dispatchEvent(new Event("rendered")) //👀 for prerenderer,
}

export const navigateOnEvent = e => {
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

export const STATE = new Atom()

const ROUTER_STATE = registerCMD({
  sub$: "ROUTER_STATE",
  args: x => x,
  handler: ({ state, path }) => setIn(STATE, path, state)
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

const SET_LINK_ATTRS = registerCMD({
  sub$: "SET_LINK_ATTRS",
  args: x => x,
  handler: ({ target }) => setLinkAttrs(target)
})

const HREF_PUSHSTATE = registerCMD({
  sub$: "HREF_PUSHSTATE",
  args: x => x,
  handler: ({ href }) => hrefToPushState(href)
})

export const routerTask = router => ({ href, target }) => [
  {
    // sub$: "HREF_ROUTER",
    args: router(href), // Promise
    erro: (acc, err) => console.warn(err),
    reso: (acc, { state, path }) => ({ state, path })
  },
  {
    sub$: "ROUTER_STATE",
    args: ({ state, path }) => ({ state, path })
  },
  { sub$: "SET_LINK_ATTRS", args: { target } },
  { args: ({ state }) => console.log("state:", state) }
]
/**
 *
 * preventing a leaky abstration,
 *
 * The route Task takes a router (EquivMap) config that
 * returns data, a path, and spec and executes side-effects.
 *
 * input: config -> returns a Task (function) Task: input ->
 * takes { href, target } off of the navigated$ stream
 */
