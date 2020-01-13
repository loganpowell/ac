import { getIn } from "@thi.ng/paths"
// import { set$State, $routePath$, $store$, set$FLIP } from "../store"

export const getScrollPosition = () => ({
  top: window.pageYOffset || document.documentElement.scrollTop,
  left: window.pageXOffset || document.documentElement.scrollLeft
})

const boundingClientProxy = { getBoundingClientRect: getScrollPosition }

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
    // get transform() {
    //   return getComputedStyle(element).transform || undefined
    // }
  }
}

const view = state => {
  const rootID = state.value._root

  const _root = document.getElementById(rootID)

  const _frame_HTML = `<div 
    id="_frame"
    style="width: 100vw;
      height: 100vh;
      position: fixed;
      pointer-events: none"
  >
  </div>`
  _root.insertAdjacentHTML("beforebegin", _frame_HTML)
  const _frame = document.getElementById("_frame")
  // console.log("Frame prepended", _frame)
  return _frame
}

let is_framed = false

// 📌 turn into a Command/Task (only track DOM nodes that
// are clicked)
/**
 *
 * deps:
 * - flip target (not necessarily the clicked `el` here)
 * - current location within the viewport (snapshot Command)
 * -
 */

export const FLIP_all = (el, state, uid) => {
  console.log({ state })
  let frame = is_framed
    ? document.getElementById("_frame")
    : ((is_framed = true), view(state))

  let rect_path = ["_flip_map", uid]
  // console.log({ rect_path })

  if (!getIn(state.deref(), rect_path))
    return state.resetIn(rect_path, getRect(el, frame))
  let F_flip_map = getIn(state.deref(), rect_path)
  let L_flip_map = getRect(el, frame)

  // console.log("getter: my_height ->", L_flip_map.my_height)
  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  // console.log({ F_flip_map, L_flip_map })

  // el.style.transformOrigin = "top left"
  el.style.transition = ""
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  // console.log(transform)
  el.style.transform = trans

  state.resetIn(rect_path, L_flip_map)

  requestAnimationFrame(() => {
    el.style.transition = "all .6s cubic-bezier(.65,.22,.38,.77)"
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

const css_fade = {
  fold: `{
  display: block;

  -webkit-animation: fadeInFromNone 0.5s ease-out;
  -moz-animation: fadeInFromNone 0.5s ease-out;
  -o-animation: fadeInFromNone 0.5s ease-out;
  animation: fadeInFromNone 0.5s ease-out;
}

@-webkit-keyframes fadeInFromNone {
  0% {
      display: none;
      opacity: 0;
  }

  1% {
      display: block;
      opacity: 0;
  }

  100% {
      display: block;
      opacity: 1;
  }
}

@-moz-keyframes fadeInFromNone {
  0% {
      display: none;
      opacity: 0;
  }

  1% {
      display: block;
      opacity: 0;
  }

  100% {
      display: block;
      opacity: 1;
  }
}

@-o-keyframes fadeInFromNone {
  0% {
      display: none;
      opacity: 0;
  }

  1% {
      display: block;
      opacity: 0;
  }

  100% {
      display: block;
      opacity: 1;
  }
}

@keyframes fadeInFromNone {
  0% {
      display: none;
      opacity: 0;
  }

  1% {
      display: block;
      opacity: 0;
  }

  100% {
      display: block;
      opacity: 1;
  }
}
`
}

const paths = uid => ({
  rects: ["_FLIP", "rects", uid],
  elems: ["_FLIP", "elems", uid],
  clicks: ["_FLIP", "clicks", uid]
})

export const FLIP_first = (state, uid, ev) => {
  console.log(/id\/(\d+)/g.exec(uid)[1], "WAS CLICKED")

  let { rects, clicks } = paths(uid)

  // registers component as having been clicked (active)

  // sets the rect in state for next el init to sniff
  let target = ev.target
  let flip_map = getRect(target)
  state.resetIn(rects, flip_map)
  // console.log({ target })

  // notify others
  state.resetIn(clicks, true)

  // console.log({
  //   F: { flip_map, BCR: boundingClientProxy.getBoundingClientRect() }
  // })
}

export const FLIP_last = (state, uid) => {
  // do stuff after removal of the element from DOM...
  // let { elems } = paths(uid) <- This
  // doesn't exist in the DOM on release
  // console.log("releasing", /id\/(\d+)/g.exec(uid)[1])
}

export const FLIP_last_invert_play = (el, state, uid) => {
  let ID = /id\/(\d+)/g.exec(uid)[1]
  // console.log("FLIP init")
  // a frame will be present if any FLIP item has been activated
  // provide frame if attr is present

  let { rects, clicks } = paths(uid)

  /**
   * 1. if it has been clicked (frame available) that means
   *    the last thing that happened was a click that
   *    triggered this init so we do the calcs
   *
   * 2. if a back/nav (no frame) event was what triggered
   *    the init (after a click) do the calcs with no frame
   */

  // NO RECT => NOT CLICKED
  let F_flip_map = getIn(state.deref(), rects) || null
  if (!F_flip_map) return

  let clicked = getIn(state.deref(), clicks) || null

  // NO first_frame => NAV CAUSED RENDER
  if (!clicked) {
    console.log(ID, "FLIP'ed on navigated")
  } else {
    console.log(ID, "FLIP'ed on click! 👆")
  }
  el.scrollIntoView()
  let L_flip_map = getRect(el)

  // made it through = navigated with clicked item in view

  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top

  // if there's no diff, just return (no change)
  // if (Tx + Ty < 0.01) return

  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  // console.log({ LIP: { F_flip_map, L_flip_map } })

  el.style.transformOrigin = "0 0"
  el.style.transition = ""
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  el.style.transform = trans

  // set new rect in state

  // play
  requestAnimationFrame(() => {
    // just baffle them with 💩 GE: https://cubic-bezier.com/
    el.style.transition = "all .4s cubic-bezier(.54,-0.29,.17,1.11)"
    el.style.transform = "none"
  })
  state.resetIn(rects, L_flip_map)
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
