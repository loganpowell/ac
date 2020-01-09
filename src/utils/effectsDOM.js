import { getIn } from '@thi.ng/paths'
import { set$State, $routePath$, $store$, set$FLIP } from '../store'
import { Flipper } from 'flip-toolkit'

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

const initFrame = () => {
  const rootID = getIn($store$, '_root') || 'app'

  const _root = document.getElementById(rootID)

  const _frame_HTML = `<div 
    id="frame"
    style="width: 100vw;
    height: 100vh;
    position: fixed;
    pointer-events: none"
  >
  </div>`
  _root.insertAdjacentHTML('beforebegin', _frame_HTML)
  const _frame = document.getElementById('frame')
  console.log('Frame prepended')
  return _frame
}

let frameInited = false

export const FLIP = (el, state, uid) => {
  let frame = frameInited
    ? document.getElementById('frame')
    : ((frameInited = true), initFrame())

  let lens = ['_flip_map', uid]
  console.log({ lens })

  if (!getIn(state.deref(), lens)) return set$State(lens, getRect(el, frame))
  let F_flip_map = getIn(state.deref(), lens)
  let L_flip_map = getRect(el, frame)

  // console.log("getter: my_height ->", L_flip_map.my_height)
  let Tx = F_flip_map.left - L_flip_map.left
  let Ty = F_flip_map.top - L_flip_map.top
  let Sx = F_flip_map.width / L_flip_map.width
  let Sy = F_flip_map.height / L_flip_map.height

  console.log({ F_flip_map, L_flip_map })

  el.style.transformOrigin = 'top left'
  el.style.transition = ''
  let trans = `translate(${Tx}px, ${Ty}px) scale(${Sx}, ${Sy})`
  // console.log(transform)
  el.style.transform = trans
  requestAnimationFrame(() => {
    el.style.transition = 'all .6s ease'
    el.style.transform = 'none'
  })

  set$State(lens, L_flip_map)
}

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
