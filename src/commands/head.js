import { isObject } from "@thi.ng/checks"
import { stream, sidechainPartition, fromAtom, pubsub } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import { peek } from "@thi.ng/arrays"
import { $routeLoading$ } from "../store"
import { DOMnavigated$ } from "../streams"
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

// const routing$ = pubsub({// topic = test decides what the
//   topic is topic: x => !!x, id: "route_loading"
// })
// const isRouteLoading$ =
//   fromAtom($routeLoading$).subscribe(map(x =>
//   routeIsLoading$.next(x))
// )

// const pushToHead$ = "userland" const routeIsLoading$ =
// routing$ .subscribeTopic(true)
// .subscribe(sidechainPartition(pushToHead$))
// .transform(map(peek))
export const HEAD_CMD = ({ title, description, image }) => ({
  HEAD_meta: {
    "og:title": title,
    "og:type": "website",
    "og:description": description,
    "og:image:width": "1600",
    "og:image:height": "900",
    "og:image": image
  },
  HEAD_title: title
})

export const INJECT_HEAD_CMD = registerCMD({
  // source$: DOMnavigated$,
  sub$: "INJECT_HEAD_CMD",
  args: ({ URL_data }) => ({
    title: URL_data.head.title,
    description: URL_data.head.description,
    image: URL_data.head.image
  }),
  handler: ({ title, description, image }) =>
    replaceMeta(HEAD_CMD({ title, description, image }))
})
