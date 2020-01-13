import { getIn } from "@thi.ng/paths"
import { registerCMD } from "../register"
import { set$State, $routePath$, $store$, set$FLIP } from "../store"

import scrolly from "@mapbox/scroll-restorer"

scrolly.start()

/** 📌
 *
 * TODO:
 * - before flipping to next page, scroll the current page
 *   to a predictable location for returning smoothly,
 *   perhaps use a hash in the router to kill two with one:
 *
 *  0. add func to ROUTER command handler to sniff for hash
 *  1. clicking on the link first adds a hash to the history
 *  2. scroll the top of the target to the top of the page
 *  3. animate to next page <-> any back button would be
 *     centered
 */
export function getRect(element, frame) {
  const {
    top,
    bottom,
    left,
    right,
    width,
    height
  } = element.getBoundingClientRect()

  const parentRect = frame ? frame.getBoundingClientRect() : null

  return {
    top: top - (parentRect ? parentRect.top : 0),
    bottom,
    left: left - (parentRect ? parentRect.left : 0),
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

  console.log({ rootID })
  const _frame_HTML = `<div 
    id="frame"
    style="width: 100vw;
    height: 100vh;
    position: fixed;
    pointer-events: none"
  >
  </div>`
  _root.insertAdjacentHTML("beforebegin", _frame_HTML)
  const _frame = document.getElementById("frame")
  console.log("Frame prepended")
  return _frame
}

let is_framed = false

// 📌 turn into a Command/Task (only track flip_el nodes that
// are clicked)
/**
 *
 * deps:
 * - flip target (not necessarily the clicked `el` here)
 * - current location within the viewport (snapshot Command)
 * -
 */
const FLIPHandler = ({ flip_el, flip_id }) => {
  // console.log({ flip_el, flip_id })

  let frame = is_framed
    ? document.getElementById("frame")
    : ((is_framed = true), view($store$))

  let lens = ["_flip_map", flip_id]
  // console.log({ lens })

  if (!getIn($store$.deref(), lens))
    return set$State(lens, getRect(flip_el, frame))

  let F_flip_map = getIn($store$.deref(), lens)
  let L_flip_map = getRect(flip_el, frame)

  // console.log("getter: my_height ->", L_flip_map.my_height)
  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  // console.log({ F_flip_map, L_flip_map })

  // el.style.transformOrigin = "top left"
  flip_el.style.transition = ""
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  // console.log(transform)
  flip_el.style.transform = trans

  set$State(lens, L_flip_map)

  requestAnimationFrame(() => {
    flip_el.style.transition = "all .6s cubic-bezier(.65,.22,.38,.77)"
    flip_el.style.transform = "none"
  })
}

export const _FLIP = registerCMD({
  sub$: "_FLIP",
  args: ({ flip_el, flip_id }) => ({ flip_el, flip_id }),
  handler: FLIPHandler
})

//
//  888~~  888     888 888~-_    _-~88e
//  888___ 888     888 888   \  /   88"
//  888    888     888 888    | `   8P
//  888    888     888 888   /      `
//  888    888     888 888_-~     d88b
//  888    888____ 888 888        Y88P
//
//

/*

const initFLIPper = (el, uid) => {
  let frame = frameInited ? document.getElementById("frame") : ((frameInited = true), initFrame())
  let flipper = new Flipper({ element: frame })
  flipper.addFlipped({
    element: el,
    flipId: uid,
    onStart: () => console.log("animation started!"),
    onSpringUpdate: springValue => console.log(`current spring value: ${springValue}`),
    onComplete: () => console.log("animation completed!")
  })
  console.log("FLIP instantiated for:", uid)
  set$FLIP([uid, flipper])
}

export const initFLIP = (el, state, uid) => {
  if (state.deref()._flip_els.get(uid)) return
  initFLIPper(el, uid)
}
*/
