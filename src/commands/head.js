import { isObject } from "@thi.ng/checks"
import { registerCMD } from "../register"

const base_cfg = {
  meta: {
    "og:title": "default title from head.js",
    "og:image": "oh dirty dirty"
  },
  title: "Spankin'!"
}

export const injectMeta = (type, content, prop) => {
  try {
    return {
      HEAD_meta: () => {
        document.head.querySelector(
          `meta[property="${prop}"]`
        ).content = content
      },
      HEAD_title: () => {
        document.title = content
      }
    }[type]()
  } catch (e) {
    console.warn(
      "no <head> `injectMeta` handler for prop:",
      type,
      `
    supported properties: HEAD_meta, HEAD_title
    `
    )
  }
}
export const replaceMeta = (obj = base_cfg) => {
  Object.entries(obj).forEach(([key, val]) => {
    try {
      return {
        HEAD_title: () => {
          injectMeta(key, val)
        },
        HEAD_meta: () => {
          Object.entries(val).forEach(([prop, content]) => {
            injectMeta(key, content, prop)
          })
        }
      }[key]()
    } catch (e) {
      console.warn(
        "no <head> `replaceMeta` handler for prop:",
        key,
        `
      supported properties: HEAD_meta, HEAD_title
      `
      )
    }
  })
}

/**
 *
 * @example
 * run$.next({
 *   ..._HEAD_META,
 *   args: {
 *     HEAD_meta: {
 *       "og:title": "just a test content injection",
 *       "og:image": "https://i.imgur.com/BOdIBQz.gif"
 *     },
 *     HEAD_title: "A new title"
 *   }
 * })
 *
 */

export const _HEAD_META = registerCMD({
  sub$: "_HEAD_META",
  args: x => x,
  handler: replaceMeta
})
