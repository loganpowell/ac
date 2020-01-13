import { register, commands, utils, store, streams } from "../src"

import { getIn } from "@thi.ng/paths"
import { isArray, isObject } from "@thi.ng/checks"
import { Atom } from "@thi.ng/atom"
import { start } from "@thi.ng/hdom"
import { EquivMap } from "@thi.ng/associative"
import scrolly from "@mapbox/scroll-restorer"

scrolly.start()

/**
 *
 * Note for Parcel (package.json):
 *
 * TRY PARCEL 2.alpha
 *
 */
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
const { run$, command$ } = streams
const { registerRouterDOM } = register
const { emitHREF } = commands
const {
  parse_URL,
  traceStream,
  FLIP,
  FLIP_last_invert_play,
  FLIP_last,
  FLIP_first
} = utils
const { $routePath$, $store$, set$Root } = store
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .

//
//    d8
//  _d88__ 888-~\   /~~~8e   e88~~\  e88~~8e
//   888   888          88b d888    d888  88b
//   888   888     e88~-888 8888    8888__888
//   888   888    C888  888 Y888    Y888    ,
//   "88_/ 888     "88_-888  "88__/  "88___/
//
//

// traceStream("run$ ->", run$)
// traceStream("command$ ->", command$)
// traceStream("task$ ->", task$)
// traceStream("out$ ->", out$)
// traceStream("navigated$ ->", DOMnavigated$)

//
//                             d8
//  888-~\  e88~-_  888  888 _d88__  e88~~8e  888-~\
//  888    d888   i 888  888  888   d888  88b 888
//  888    8888   | 888  888  888   8888__888 888
//  888    Y888   ' 888  888  888   Y888    , 888
//  888     "88_-~  "88_-888  "88_/  "88___/  888
//
//

const getSomeJSON = async (path, b) => {
  const text_base = "https://jsonplaceholder.typicode.com/"
  const img_base = id => `https://i.picsum.photos/id/${id}/600/600.jpg`

  const data = b
    ? {
        img: img_base(b),
        // this needs fixin' 📌
        text: await fetch(`${text_base}${path}/${b}`).then(r => r.json())
      }
    : (async () => {
        let list = await fetch(`${text_base}${path}/`).then(r => r.json())
        return list.map((c, i) => ({ img: img_base(i + 1), text: c }))
      })()
  return data
}

/**
 * You know, this API warrants a little bit of a story. I
 * began the process of abstracting this part of the API
 * away from the user, thinking that there were too many
 * "implementation details" exposed. This scared me a little
 * because I really want the most simple API for me and the
 * potential future users of the framework.
 *
 * However, after creating some prototypes for this API, I
 * began to realize something. That this API, though it
 * exposes the underlying dependency of `EquivMap` from
 * `@thi.ng/associative`, is as beautiful as it gets. It's
 * what the JavaScript Map should have been and I wanted the
 * users to not only see that beauty, but also get a sense
 * of the potential of __pattern matching__ in JS, so they
 * could take it with them to put up against related
 * problems.
 *
 * Value semantics have so many benefits. As a router,
 * here's one.
 */
const router = async url => {
  let match = parse_URL(url)
  let {
    // URL,
    // URL_subdomain, // array
    // URL_domain, // array
    // URL_query, // object
    // URL_hash, // string
    URL_path // array
  } = match
  let [, p_b] = URL_path

  let { data, page } = new EquivMap([
    [
      { ...match, URL_path: ["todos"] },
      { data: () => getSomeJSON("todos"), page: "todos" }
    ],
    [
      { ...match, URL_path: ["todos", p_b] },
      { data: () => getSomeJSON("todos", p_b), page: "todo" }
    ],
    [
      { ...match, URL_path: ["users"] },
      { data: () => getSomeJSON("users"), page: "users" }
    ],
    [
      { ...match, URL_path: ["users", p_b] },
      { data: () => getSomeJSON("users", p_b), page: "user" }
    ]
  ]).get(match) || {
    data: () => ({ home: "page" }),
    page: "bloop"
  } // should probably be a 404... also need a match for an empty path: []

  // console.log("router called", { page, data: await data() })
  return { page, data: await data() }
}

//
//  888   | 888
//  888   | 888
//  888   | 888
//  888   | 888
//  Y88   | 888
//   "8__/  888
//
//

// const S = JSON.stringify

const pathLink = (ctx, id, ...args) => [
  "a",
  {
    href: `${$routePath$.deref()}/${id}`,
    onclick: e => emitHREF(e),
    style: { "font-size": ".5rem" }
  },
  ...args
]

const field = (ctx, key, val) => [
  "li",
  { style: { display: "flex" } },
  key === "id"
    ? [pathLink, val, val]
    : [
        "p",
        {
          style: {
            padding: "0 0.5rem",
            display: "table-cell",
            width: "80px",
            "font-size": ".5rem",
            "vertical-align": "middle"
          }
        },
        key
      ],
  isObject(val)
    ? ["ul", ...Object.entries(val).map(([k, v]) => [field, k, v])]
    : ["p", { style: { padding: "0 0.5rem" } }, val]
]

const fields = payload => [
  "ul",
  ...Object.entries(payload)
    .slice(0, 4)
    .map(([k, v]) => [field, k, v])
]

const image = (ctx, img) => [
  "img",
  {
    src: "https://via.placeholder.com/400x400.png",
    style: {
      "object-fit": "cover",
      "object-position": "center",
      "min-height": "100%",
      "min-width": "100%"
    },
    scale: false
  }
]

const FLIP_img = {
  init: (el, { $store$ }, uid) => FLIP(el, $store$, uid),
  render: (ctx, img) => [image, img]
}

const div = (ctx, attrs, img, sz, ...args) => [
  "img",
  {
    ...attrs,
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

// const FLIP_div = {
//   init: (el, { $store$, run$ }, img) => FLIP(el, $store$, img + "_div"),
//   render: (ctx, img, ...args) => [div, {}, img, ...args]
// }

// 📌 handle second image appearance... only working on click...
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
// const FLIP_div = {
//   render: ({ run$ }, img, sz) => [
//     "a",
//     {
//       href: `${$routePath$.deref()}/${/id\/(\d+)/g.exec(img)[1]}`,
//       onclick: ev => {
//         console.log({ store: $store$.deref() })
//         ev.preventDefault()
//         let proxy = {
//           preventDefault: () => null,
//           target: {
//             href: `${$routePath$.deref()}/${/id\/(\d+)/g.exec(img)[1]}`
//           },
//           currentTarget: { document: null }
//         }
//         // let matches = /id\/(\d+)/g.exec(img)
//         // console.log({ matches })
//         // let id = matches[1]
//         emitHREF(proxy)
//         run$.next({
//           ..._FLIP,
//           args: { flip_el: ev.target, flip_id: img }
//         })
//       }
//     },
//     [div, {}, img, sz]
//   ]
// }

const FLIP_div = {
  render: ({ $store$ }, img, ...args) => [
    div,
    {
      onclick: e => {
        e.preventDefault()
        let proxy = {
          preventDefault: () => null,
          target: {
            href: `${$routePath$.deref()}/${/id\/(\d+)/g.exec(img)[1]}`
          },
          currentTarget: { document: null }
        }
        FLIP_first($store$, img + "_div", e)
        emitHREF(proxy)
      }
    },
    img,
    ...args
  ],
  init: (el, { $store$ }, img) =>
    FLIP_last_invert_play(el, $store$, img + "_div"),
  release: ({ $store$ }, img) => FLIP_last($store$, img)
}

const component = sz => {
  return (ctx, img, fields) => [
    "div",
    {},
    [FLIP_div, img, sz], //[FLIP_img, img]],
    ["p", { class: "title" }, fields]
  ]
}

const link = (ctx, path, ...args) => [
  "a",
  {
    href: "/" + path.join("/"),
    onclick: e => emitHREF(e)
  },
  ...args
]

const page = (ctx, payload) => {
  return [
    "div",
    { style: { "max-width": "30rem", margin: "auto" } },
    ...[["users"], ["todos", 2], ["users", 9]].map(path => [
      link,
      path,
      `${path[0]} ${path[1] ? "->" + path[1] : ""}`,
      ["br"]
    ]),
    isArray(payload)
      ? [
          "div",
          ...payload.map(({ img, text }) => [
            component("sm"),
            img,
            fields(text)
          ])
        ]
      : [
          component("lg"),
          payload && payload.img
            ? payload.img
            : "https://i.picsum.photos/id/111/600/600.jpg",
          payload && payload.text
            ? fields(payload.text.company || payload.text)
            : null
        ]
  ]
}

//
//       e      888~-_   888  _-~88e
//      d8b     888   \  888 /   88"
//     /Y88b    888    | 888 `   8P
//    /  Y88b   888   /  888     `
//   /____Y88b  888_-~   888   d88b
//  /      Y88b 888      888   Y88P
//
//

registerRouterDOM(router)

// ✈ MOVE to register/ ✈
const registerRootByID = id => {
  set$Root(id)
  return document.getElementById(id)
}

const root = registerRootByID("app")
// consider abstracting this (just hand it a `router` Map,
// `page` object and an "id")
console.log("starting...")
start(
  // 📌 page component that chooses a template based on the spec returned
  ({ $store$ }) => [page, getIn($store$.deref(), $routePath$.deref())],
  {
    root,
    ctx: { run$, $store$ },
    span: false
  }
)
