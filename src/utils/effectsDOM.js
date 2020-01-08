import { getIn } from "@thi.ng/paths"
import { set$tate } from "../store"

const getRect = element => {
  var rect = element.getBoundingClientRect()
  // prettier-ignore
  return {
    top    : rect.top,
    right  : rect.right,
    bottom : rect.bottom,
    left   : rect.left,
    width  : rect.width,
    height : rect.height,
    x      : rect.x,
    y      : rect.y
  }
}

export const initFLIP = (el, state, uid) => {
  let lens = ["flip_map", uid]
  console.log({ lens })

  // prettier-ignore
  let config = {
    top    : 0,
    right  : 0,
    bottom : 0,
    left   : 0,
    width  : 0,
    height : 0,
    x      : 0,
    y      : 0
  }

  if (!getIn(state.deref(), lens)) return set$tate(lens, config)
  let F_flip_map = getIn(state.deref(), lens)
  let L_flip_map = getRect(el)

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
