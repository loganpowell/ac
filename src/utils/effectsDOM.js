import { getIn } from "@thi.ng/paths"
import { set$tate, $routePath$, $store$ } from "../store"

const rootID = getIn($store$, "_root")
const _root = document.getElementById("app")

const _frame_HTML = `<div id="frame" 
  style="width: 100vw; 
  height: 100vh; 
  position: fixed; 
  pointer-events: none">
  </div>`
_root.insertAdjacentHTML("beforebegin", _frame_HTML)
const _frame = document.getElementById("frame")

export function getRect(element, frame) {
  const { top, bottom, left, right, width, height } = element.getBoundingClientRect()

  const parentRect = frame ? frame.getBoundingClientRect() : undefined

  return {
    top: top - (parentRect ? parentRect.top : 0),
    bottom,
    left: left - (parentRect ? parentRect.left : 0),
    right,
    width,
    height,
    get transform() {
      return getComputedStyle(element).transform || undefined
    },
    get my_height() {
      return this.height
    }
  }
}

export const initFLIP = (el, state, uid) => {
  let lens = ["flip_map", uid]
  console.log({ lens })

  if (!getIn(state.deref(), lens)) return set$tate(lens, getRect(el, _frame))
  let F_flip_map = getIn(state.deref(), lens)
  let L_flip_map = getRect(el, _frame)

  console.log("getter: my_height ->", L_flip_map.my_height)
  let tX = F_flip_map.left - L_flip_map.left
  let tY = F_flip_map.top - L_flip_map.top
  let sX = F_flip_map.width / L_flip_map.width
  let sY = F_flip_map.height / L_flip_map.height

  console.log({ F_flip_map, L_flip_map })

  el.style.transformOrigin = "top left"
  el.style.transition = ""
  let trans = `translate(${tX}px, ${tY}px) scale(${sX}, ${sY})`
  // console.log(transform)
  el.style.transform = trans
  requestAnimationFrame(() => {
    el.style.transition = "transform .5s"
    el.style.transform = "none"
  })

  set$tate(lens, L_flip_map)
}
