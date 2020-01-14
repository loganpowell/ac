import { Atom } from "@thi.ng/atom"
import { FLIP_first, FLIP_last_invert_play, stringify_w_functions } from "."
import { emitHREF } from "../commands"

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
export const navFLIPzoom = (href, id, child) => {
  let proxy = {
    preventDefault: () => null,
    currentTarget: { document: null }
  }
  // let warning = console.warn(
  //   `🔥 No 'id' parameter parameter provided for FLIP tracking.`
  // )
  let attrs = {
    id,
    href,
    onclick: e => {
      e.preventDefault()
      // if (!id) return warning
      // if (!id) return warning
      FLIP_first($FLIP$, id, e)
      emitHREF({
        ...proxy,
        target: {
          href
        }
      })
    }
  }

  let render = (ctx, ...args) => [child, attrs, ...args]
  let init = el => FLIP_last_invert_play(el, $FLIP$, id)
  return { init, render }
}

const flipper = (ctx, img, sz) => [
  "img",
  {
    src: img,
    style:
      sz === "sm"
        ? {
            height: "100px",
            width: "100px",
            overflow: "hidden",
            opacity: 1
            // "background-image": `url('${img}')`
            // "background-size": "cover"
          }
        : {
            height: "600px",
            width: "600px",
            overflow: "hidden",
            opacity: 1
            // "background-image": `url('${img}')`
            // "background-size": "cover"
          },
    scale: true
  },
  ...args
]

let testFN = navFLIPzoom("test", "bloop", flipper) //?
stringify_w_functions(testFN) //?
