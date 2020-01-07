import { registerCMD } from "../register"
import * as rand from "@thi.ng/random"

/**
 * We need a way to get from first -> last and back again
 *
 * This is complicated by the fact that we clear any
 * `visited` links when we navigate from one page to
 * another.
 *
 * So, how do we cache the last `flip_key`, in a way that
 * allows us to 'zoom out' so-to-speak...
 *
 * pseudo:
 * ```
 * - naive (no flip_key in cache) nav
 * - now there's a flip_key in cache
 * - use that flip_key to target the new frame
 * - user hits back button, use the same flip_key? (!DOM.document)
 * - use an Atom with the current `route_path` as the lens?
 */
const FLIP_EL = a => {
  // start simply with first sib with flip-key attr
  let target = a.closest(".flip")
  let scope = target.querySelector("[flip]")
  let flip_key = scope.attributes.flip.value
  let FLIP_F = scope.getBoundingClientRect()
  return { FLIP_F, flip_key }
}

export const _DOM__FLIP_F = registerCMD({
  sub$: "_DOM__FLIP_F",
  args: ({ DOM }) => (!DOM.document ? FLIP_EL(DOM) : { DOM }),
  handler: console.log
})

const RAFPromise = () => new Promise(resolve => requestAnimationFrame(resolve))

const FLIP_DOM = (FLIP_F, flip_key) => {
  // start simply with first sib with flip-key attr
  let scope = document.querySelector(`[flip="${flip_key}"]`)
  // let target = parent
  // let FLIP_DOM = scope.getBoundingClientRect()

  // let FLIP_DOM = await RAFPromise()
  //   .then(() => scope.getBoundingClientRect())

  let FLIP_DOM = scope.getBoundingClientRect()
  return { FLIP_F, FLIP_DOM }
}

export const _FLIP_F__FLIP_L_DOM = registerCMD({
  sub$: "_FLIP_F__FLIP_L_DOM",
  args: ({ FLIP_F, flip_key }) => FLIP_DOM(FLIP_F, flip_key),
  // reso: (acc, { FLIP_F, FLIP_DOM }) => ({ FLIP_F, FLIP_DOM }),
  // erro: (acc, e) => console.warn(e),
  handler: console.log
})
