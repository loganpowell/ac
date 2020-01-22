import { getIn } from "@thi.ng/paths"
import { Atom } from "@thi.ng/atom"
import { HURL } from "../commands"

//
//    d8                  888
//  _d88__  e88~-_   e88~\888  e88~-_
//   888   d888   i d888  888 d888   i
//   888   8888   | 8888  888 8888   |
//   888   Y888   ' Y888  888 Y888   '
//   "88_/  "88_-~   "88_/888  "88_-~
//
//
// add before/after transition hooks for support animations

export function getRect(element, frame) {
  const {
    top,
    bottom,
    left,
    right,
    width,
    height
  } = element.getBoundingClientRect()

  let parent = frame ? frame.getBoundingClientRect() : null

  return {
    top: top - (parent ? parent.top : 0),
    bottom,
    left: left - (parent ? parent.left : 0),
    right,
    width,
    height
  }
}

const shuffle_paths = uid => ({
  rects: ["_FLIP_shuffle", "rects", uid],
  elems: ["_FLIP_shuffle", "elems", uid]
})
export const FLIP_all = (el, state, uid, frameDOMel = null) => {
  let { rects } = shuffle_paths(uid)

  if (!getIn(state.deref(), rects))
    return state.resetIn(rects, getRect(el, frameDOMel))

  let F_flip_map = getIn(state.deref(), rects)
  let L_flip_map = getRect(el, frameDOMel)
  // console.log({ F_flip_map, L_flip_map })

  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  el.style.transformOrigin = "0 0"
  el.style.transition = ""

  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`

  el.style.transform = trans

  state.resetIn(rects, L_flip_map)

  requestAnimationFrame(() => {
    el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)"
    el.style.transform = "none"
  })
}

const zoom_paths = uid => ({
  rects: ["_FLIP_zoom", "rects", uid],
  elems: ["_FLIP_zoom", "elems", uid],
  clicks: ["_FLIP_zoom", "clicks", uid]
})

/**
 *
 * order:
 * normalizeTree -> render -> diff -> init -> release
 *                 | hdom |         | dom  | post-dom
 *
 * have to think backwards:
 * 1. el mounted (init): look for existing flip map for id
 *  - if exists, Play anim and store new flip map rect (for navs)
 *  - if doesn't, nada
 * 2. el clicked (render.attrs.onclick): measure and store flip map for id
 * 3. el released: if clicked, calc flip rect and lookup for id:
 *  - if first === last, no change (on nav e.g.)
 *  - if first !== last, nav change (store rect for id)
 */
export const FLIP_first = ({ state, id, target }) => {
  // 📌 TODO: GOOD PLACE FOR AN `onStart` hook animation/callback

  let { rects, clicks } = zoom_paths(id)

  // sets the rect in state for next el init to sniff
  let flip_map = getRect(target)
  state.resetIn(rects, flip_map)

  // registers component as having been clicked (focused)
  state.resetIn(clicks, true)
}

/**
 * https://coder-coder.com/z-index-isnt-working/
 */
const zIndex = (el, idx) => (el.style.zIndex = idx)

/**
 * 1. if it has been clicked that means the last thing
 *    that happened was a click that triggered this init
 *    so we do the calcs
 *
 * 2. if a back/nav (no frame) event was what triggered
 *    the init do the calcs with no frame
 */
export const FLIP_last_invert_play = ({
  el,
  state,
  id,
  transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)"
}) => {
  el.setAttribute("flip", id)
  let { rects, clicks } = zoom_paths(id)

  let F_flip_map = getIn(state.deref(), rects) || null
  // NO RECT => NOT CLICKED
  if (!F_flip_map) return

  // 🕛 if flip active, scroll element on init
  el.scrollIntoView()
  /**
   * 🔥 this may cause issues for parrallel anims append this
   * to a specific target using:
   * Array.from(el.querySelectorAll("[flip]")).forEach(x=>
   * if i last... el.scrollIntoView())
   *
   */
  // 🕞 then calculate location and size
  let L_flip_map = getRect(el)
  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  // 🕕 just before "Last", scroll element to middle of page
  let top = L_flip_map.top + window.pageYOffset
  let middle = top - window.innerHeight / 2
  window.scrollTo(0, middle)

  // console.log({ F_flip_map, L_flip_map, middle })

  el.style.transformOrigin = "0 0"
  el.style.transition = ""
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  el.style.transform = trans

  // PLAY
  requestAnimationFrame(() => {
    // 🕤 just before animating, scroll to new location
    window.scrollTo(0, middle)

    // just baffle them with https://cubic-bezier.com/
    el.style.transition = transition
    el.style.transform = "none"
    // 💩 hack for removing zIndex after animation is complete
    // 📌 TODO:    🔻 GOOD PLACE FOR AN `onComplete` hook animation/callback
    setTimeout(() => zIndex(el, 0), 200)
  })
  // move element to front
  zIndex(el, 1)
  // 🔍 consider exposing in the API

  let clicked = getIn(state.deref(), clicks) || null

  if (!clicked) {
    // console.log(uid, "FLIP'ed on navigated")
    state.resetIn(rects, null)
  } else {
    // console.log(uid, "FLIP'ed on click! 👆")
    state.resetIn(rects, L_flip_map)
  }

  // remove click frame
  state.resetIn(clicks, null)
}

/**
 * What's happening:
 * - on first click (render)
 *  - rect registered
 *  - frame registered
 * - navs
 * - on init of new DOM
 *  - checks for rect & frame
 *  - uses rect & frame to calc diff
 *  - PLAY
 */

const $FLIP$ = new Atom({})

/**
 * There're only 3 lifecycle hooks. render is called for
 * every update and is just providing the actual hiccup for
 * that component. if that component is used the first time,
 * the order is normalizeTree ->  render -> diff ->  init.
 * The actual DOM element is only known when init is called,
 * NEVER during render (though you could cache it as local
 * component state). If during diffing it turns out the
 * component is not used anymore, then release will be
 * called
 *
 * if the object identity of your life cycle component
 * changes with every update then that count as full
 * replacement and would trigger init each time:
 *
 * https://github.com/thi-ng/umbrella/wiki/Higher-order-components
 *
 * init is called in so called "post-order", i.e. when it
 * executes all children are already present in the DOM (and
 * might have had their init hooks called) first time = 1st
 * frame the component appears in the DOM
 *
 */

const err_str = prop => `
No '${prop}' property found on FLIPkid firstChild. 
Ensure you are providing FLIPkid a component with an 
attributes object as its second argument with a ${prop}
property for proper FLIP routing.
`

// const [tag, attrs, ..._args] = kid(ctx, ...args)
// const { href } = attrs

const proxyFrom = href => ({
  preventDefault: () => null,
  currentTarget: { document: null },
  target: {
    href
  }
})

let attrs = {
  onclick: ev => {
    ev.preventDefault()
    const target = ev.target
    const href = target.getAttribute("href")
    // console.log({ target, href })
    if (!href) return new Error(err_str("href"))
    HURL(proxyFrom(href))
    FLIP_first({
      state: $FLIP$,
      id: href,
      target
    })
  }
}

export const FLIPkid = {
  render: (ctx, ...args) => ["a", attrs, ...args],
  init: el =>
    // console.log({
    //   el,
    //   firstChild: el.firstChild,
    //   id: el.firstChild.getAttribute("href")
    // }),
    FLIP_last_invert_play({
      el: el.firstChild,
      state: $FLIP$,
      id: el.firstChild.getAttribute("href")
    })
}
