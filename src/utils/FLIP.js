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

const paths = uid => ({
  rects: ["_FLIP", "rects", uid],
  elems: ["_FLIP", "elems", uid],
  clicks: ["_FLIP", "clicks", uid]
})

export const FLIP_all = (el, state, uid, frameDOMel = null) => {
  let { rects } = paths(uid)

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
export const FLIP_first = (state, uid, ev) => {
  let { rects, clicks } = paths(uid)

  // sets the rect in state for next el init to sniff
  let target = ev.target
  let flip_map = getRect(target)
  state.resetIn(rects, flip_map)

  // registers component as having been clicked (focused)
  state.resetIn(clicks, true)
}

/**
 * 1. if it has been clicked that means the last thing
 *    that happened was a click that triggered this init
 *    so we do the calcs
 *
 * 2. if a back/nav (no frame) event was what triggered
 *    the init do the calcs with no frame
 */
export const FLIP_last_invert_play = (el, state, uid) => {
  let { rects, clicks } = paths(uid)

  let F_flip_map = getIn(state.deref(), rects) || null
  // NO RECT => NOT CLICKED
  if (!F_flip_map) return

  el.scrollIntoView()

  let L_flip_map = getRect(el)

  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  // console.log({ LIP: { F_flip_map, L_flip_map } })

  el.style.transformOrigin = "0 0"
  el.style.transition = ""
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  el.style.transform = trans

  // set new rect in state

  // PLAY
  requestAnimationFrame(() => {
    // just baffle them with https://cubic-bezier.com/
    el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)"
    el.style.transform = "none"
  })

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
export const navFLIPzoom = ({ href, id, target }) => {
  let proxy = {
    preventDefault: () => null,
    currentTarget: { document: null },
    target: {
      href
    }
  }

  let attrs = {
    onclick: e => {
      e.preventDefault()
      HURL(proxy)
      FLIP_first($FLIP$, id, e)
    }
  }

  let render = (ctx, ...args) => [target, attrs, ...args]
  let init = el => FLIP_last_invert_play(el, $FLIP$, id)
  return { init, render }
}
