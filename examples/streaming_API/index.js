import { getIn } from "@thi.ng/paths"
import { isObject, isFunction } from "@thi.ng/checks"
import { EquivMap } from "@thi.ng/associative"
import { start } from "@thi.ng/hdom"
import { stream, fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream"
import { Atom } from "@thi.ng/atom"
import { peek } from "@thi.ng/arrays"
import { map } from "@thi.ng/transducers"
import { updateDOM } from "@thi.ng/transducers-hdom"

// import scrolly from "@mapbox/scroll-restorer"
// scrolly.start()

import { register, commands, utils, store, streams } from "../../src"
import { button_x } from "./components"
import { THEME } from "./theme"

/**
 *
 * Note for Parcel (package.json):
 *
 * TRY PARCEL 2.alpha
 *
 */
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
const { run$, command$, task$, DOMnavigated$ } = streams
const { registerRouterDOM } = register
const { INJECT_HEAD_CMD, HURL_CMD } = commands
const { parse_URL, navFLIPzoom, traceStream } = utils
const { $routePath$, $store$, $page$ } = store
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .

//
//  888                /
//  888  e88~-_  e88~88e  d88~\
//  888 d888   i 888 888 C888
//  888 8888   | "88_88"  Y88b
//  888 Y888   '  /        888D
//  888  "88_-~  Cb      \_88P
//                Y8""8D
//

const log = console.log

// traceStream("run$ ->", run$)
// traceStream("command$ ->", command$)
// traceStream("task$ ->", task$)
// traceStream("out$ ->", out$)
traceStream("navigated$ ->", DOMnavigated$)

//
//        888             d8
//   e88~\888   /~~~8e  _d88__   /~~~8e
//  d888  888       88b  888         88b
//  8888  888  e88~-888  888    e88~-888
//  Y888  888 C888  888  888   C888  888
//   "88_/888  "88_-888  "88_/  "88_-888
//
//

const getSomeJSON = async (path, uid) => {
  const text_base = "https://jsonplaceholder.typicode.com/"
  const img_base = (id, sz) => `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`

  const data = uid
    ? {
        head: {
          title: `User ${uid} Details`,
          description: `Detail page for user ${uid}`,
          image: { url: img_base(uid, 600) }
        },
        body: {
          // lesson -> don't use the actual url as the uid (not flexible)
          img: img_base(uid, 600),
          // this needs fixin' 📌
          text: await fetch(`${text_base}${path}/${uid}`).then(r => r.json()),
          uid,
          path
        }
      }
    : (async () => {
        let list = await fetch(`${text_base}${path}/`).then(r => r.json())
        return {
          head: {
            title: `${path.replace(/^\w/, c => c.toUpperCase())} list`,
            description: `List page for ${path}`,
            image: { url: img_base(222, 200) }
          },
          body: list.map((c, i) => ({
            img: img_base(i + 1, 200),
            text: c,
            uid: i + 1,
            path
          }))
        }
      })()
  return data
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

// const S = JSON.stringify // <- handy for adornment phase

// declare button before using in-site (prevent re-registration on RAF)

const btn_outline = button_x({ tag: "a" }, "buttons.outline")

const pathLink = (ctx, id, ...args) => [
  btn_outline,
  id === 3
    ? { disabled: true }
    : {
        href: `/${$routePath$.deref()}/${id}`,
        onclick: e => {
          e.preventDefault()
          ctx.run.next({ ...HURL_CMD, args: e })
        }
      },
  ...args
]

const field = (ctx, key, val) => [
  "li",
  { style: { display: "flex" } },
  key === "id"
    ? [pathLink, val, val]
    : isObject(val)
    ? ["ul", ...Object.entries(val).map(([k, v]) => [field, k, v])]
    : ["p", { style: { padding: "0 0.5rem" } }, val]
]

const fields = payload => [
  "ul",
  ...Object.entries(payload)
    .slice(0, 4)
    .map(([k, v]) => [field, k, v])
]

//////////////////// FLIP API 🔻 //////////////////////////

// CHILD DEF: sig = (ctx, attrs, ...any)
const div = (ctx, attrs, img, sz, ...args) => [
  "img",
  {
    ...attrs,
    onclick(e) {
      attrs.onclick(e)
    },
    src: img,
    style:
      sz === "sm"
        ? {
            height: "100px",
            width: "100px"
          }
        : {
            height: "600px",
            width: "600px"
          },
    scale: true
  },
  ...args
]

/* ⚙ HOF COMPONENT ⚙ */
const zoomOnNav = (ctx, uid, path, img, sz) => [
  navFLIPzoom({
    id: /\/id\/(\d+)/.exec(img)[1] + "_div",
    href: `/${[path, uid].join("/")}`,
    target: div
  }),
  img,
  sz
]

//////////////////// FLIP API 🔺  //////////////////////////

/**
 * higher order components should only take static parameters
 * so that they can be cached. I.e., in this case a string
 * Do not nest an HDOM functional component within another
 * in an attempt to pass state between components. Use an atom,
 * which is deref'able for that
 */
const component = sz => {
  return (ctx, uid, path, img, fields) => [
    "div",
    { style: { "margin-bottom": "30px" } },
    [zoomOnNav, uid, path, img, sz], //[FLIP_img, img]],
    ["p", { class: "title" }, fields]
  ]
}

const link = (ctx, path, ...args) => [
  "a",
  {
    href: "/" + path.join("/"),
    onclick: e => ctx.run.next({ ...HURL_CMD, args: e })
  },
  ...args
]

//
//                            /
//  888-~88e    /~~~8e  e88~88e  e88~~8e   d88~\
//  888  888b       88b 888 888 d888  88b C888
//  888  8888  e88~-888 "88_88" 8888__888  Y88b
//  888  888P C888  888  /      Y888    ,   888D
//  888-_88"   "88_-888 Cb       "88___/  \_88P
//  888                  Y8""8D
//

// babel/core-js will complain if pages aren't defined
// before they're used even though eslint will allow it
const single = (ctx, body) => [
  component("lg"),
  getIn(body, "uid"),
  getIn(body, "path"),
  getIn(body, "img") || "https://i.picsum.photos/id/1/600/600.jpg",
  getIn(body, "text") ? fields(body.text.company || body.text) : null
]

const set = (ctx, bodies) => [
  "div",
  ...bodies.map(({ img, text, uid, path }) => [component("sm"), uid, path, img, fields(text)])
]

const fourOfour = {
  URL_data: () => ({
    head: {
      title: `Demo Home Page`,
      description: `Welcome to the Demo`,
      image: { src: "https://i.picsum.photos/id/1/600/600.jpg" }
    },
    body: { text: 404 }
  }),
  URL_page: (ctx, { text }) => ["div", { style: { "font-size": "5rem" } }, text]
}

//
//                             d8
//  888-~\  e88~-_  888  888 _d88__  e88~~8e  888-~\
//  888    d888   i 888  888  888   d888  88b 888
//  888    8888   | 888  888  888   8888__888 888
//  888    Y888   ' 888  888  888   Y888    , 888
//  888     "88_-~  "88_-888  "88_/  "88___/  888
//
//
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
const routerCfg = async url => {
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

  let { URL_data, URL_page } = new EquivMap([
    [
      { ...match, URL_path: ["todos"] },
      { URL_data: () => getSomeJSON("todos"), URL_page: set }
    ],
    [
      { ...match, URL_path: ["todos", p_b] },
      { URL_data: () => getSomeJSON("todos", p_b), URL_page: single }
    ],
    [
      { ...match, URL_path: ["users"] },
      { URL_data: () => getSomeJSON("users"), URL_page: set }
    ],
    [
      { ...match, URL_path: ["users", p_b] },
      { URL_data: () => getSomeJSON("users", p_b), URL_page: single }
    ],
    // home page (empty path)
    [
      { ...match, URL_path: [] },
      { URL_data: () => getSomeJSON("users", 1), URL_page: single }
    ]
  ]).get(match) || { URL_data: () => getSomeJSON("users", 2), URL_page: single }

  return { URL_data: await URL_data(), URL_page }
}

//
//
//    /~~~8e  888-~88e  888-~88e
//        88b 888  888b 888  888b
//   e88~-888 888  8888 888  8888
//  C888  888 888  888P 888  888P
//   "88_-888 888-_88"  888-_88"
//            888       888
//

const shell = (ctx, { body }) => {
  // log({ body, page })
  return [
    "div",
    { style: { "max-width": "30rem", margin: "auto", padding: "2rem" } },
    ...[["users"], ["todos", 2], ["users", 9]].map(path => [
      link,
      path,
      `${path[0]} ${path[1] ? "->" + path[1] : ""}`,
      ["br"]
    ]),
    // default to homepage `single` shell during
    // hydration/start (before any async is done)
    [ctx.page.deref() || single, body]
  ]
}

const router = {
  router: routerCfg,
  post: INJECT_HEAD_CMD
}

registerRouterDOM(router)

// ✈ MOVE to register/ ✈

const root = document.getElementById("app")
// consider abstracting this (just hand it a `router` Map,
// `page` object and an "id")

const state = fromAtom($store$)

const app = ctx =>
  ctx._route_loading
    ? null
    : [
        shell,
        // set defaults with || operators (needed before hydration)
        getIn(ctx, ctx._route_path) || { body: {} }
      ]

state.subscribe(sidechainPartition(fromRAF())).transform(
  map(peek),
  map(app),
  updateDOM({
    root,
    span: false,
    ctx: {
      run: run$,
      state: $store$,
      theme: THEME,
      page: $page$,
      path: $routePath$
    }
  })
)

console.log("starting...")
