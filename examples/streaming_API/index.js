import { getIn } from "@thi.ng/paths"
import { isObject } from "@thi.ng/checks"
import { EquivMap } from "@thi.ng/associative"
import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream"
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
const { run$ } = streams
const { registerRouterDOM } = register
const { INJECT_HEAD_CMD, HURL_CMD } = commands
const { parse_URL, FLIPonClick, traceStream } = utils
const { $store$, $page } = store
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
 *
 * TODO: Graphql Example
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
    ] // get match || 404 data
  ]).get(match) || { URL_data: () => getSomeJSON("users", 2), URL_page: single }

  return { URL_data: await URL_data(), URL_page }
}

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
          uid
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
            uid: i + 1
          }))
        }
      })()
  return data
}

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
  getIn(body, "img") || "https://i.picsum.photos/id/1/600/600.jpg",
  getIn(body, "text") ? fields(body.text.company || body.text) : null
]

const set = (ctx, bodies) => [
  "div",
  ...bodies.map(({ img, text, uid }) => [component("sm"), uid, img, fields(text)])
]

/**
 * higher order components should only take static parameters
 * so that they can be cached. I.e., in this case a string
 * Do not nest an HDOM functional component within another
 * in an attempt to pass state between components. Use an atom,
 * which is deref'able for that
 */
const component = sz => {
  return (ctx, uid, img, fields) => [
    "div",
    { style: { "margin-bottom": "30px" } },
    [zoomOnNav, uid, img, sz],
    ["p", { class: "title" }, fields]
  ]
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

//////////////////// FLIP API 🔻 //////////////////////////

// CHILD DEF: sig = (ctx, attrs, ...any)
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
            cursor: "pointer"
          }
        : {
            height: "600px",
            width: "600px",
            cursor: "pointer"
          },
    scale: true
  },
  ...args
]

/* ⚙ HOF COMPONENT ⚙ */
const zoomOnNav = (ctx, id, img, sz) => [
  FLIPonClick({
    id,
    href: `/${ctx.parseURL().URL_path}/${id}`,
    target: div
  }),
  img,
  sz
]

//////////////////// FLIP API 🔺  //////////////////////////

// const S = JSON.stringify // <- handy for adornment phase

// declare button before using in-site (prevent re-registration on RAF)

const btn_outline = button_x({ tag: "a" }, "buttons.outline")

const pathLink = (ctx, uid, ...args) => [
  btn_outline,
  uid === 3
    ? { disabled: true }
    : {
        href: `/${ctx.parseURL().URL_path}/${uid}`,
        onclick: e => {
          e.preventDefault()
          ctx.run({ ...HURL_CMD, args: e })
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

const link = (ctx, path, ...args) => [
  "a",
  {
    href: "/" + path.join("/"),
    // regular href just works if there's no extra paths in
    // URL (e.g., gh-pages URLs will break these)...
    onclick: e => (e.preventDefault(), ctx.run({ ...HURL_CMD, args: e }))
  },
  ...args
]

//
//
//    /~~~8e  888-~88e  888-~88e
//        88b 888  888b 888  888b
//   e88~-888 888  8888 888  8888
//  C888  888 888  888P 888  888P
//   "88_-888 888-_88"  888-_88"
//            888       888
//

/**
 *
 *  Part I: Needs to be a functional component to accept the
 *  `ctx` object to pass it to children
 */
const shell = (ctx, { body }) => [
  "div",
  { style: { "max-width": "30rem", margin: "auto", padding: "2rem" } },
  ...[["users"], ["todos"], ["todos", 2], ["users", 9]].map(path => [
    link,
    path,
    `/${path[0]}${path[1] ? "/" + path[1] : ""}`,
    ["br"]
  ]),
  // default to homepage `single` shell during
  // hydration/start (before any async is done)
  [$page.deref() || single, body]
]

////////////////////////////////////////////

// TODO: add default / 404 page here (could help the ugly $page.deref() ||...)
const router = {
  router: routerCfg,
  post: INJECT_HEAD_CMD
}

registerRouterDOM(router)

////////////////////////////////////////////

// consider abstracting this (just hand it a `router` Map,
// `page` object and an "id")
/**
 *
 * Part II: Takes the root RAF stream and updates the shell
 * on every global state mutation
 *
 */
const app = state$ =>
  state$.ROUTE_LOADING
    ? null
    : [
        shell,
        // set defaults with || operators (needed before hydration)
        getIn(state$, state$.ROUTE_PATH) || { body: {} }
      ]

const state$ = fromAtom($store$)
const root = document.getElementById("app")

/**
 *
 * Part III: Connects the app shell to the state stream,
 * which is triggered by any updates to the global `$store$`
 *
 */
state$.subscribe(sidechainPartition(fromRAF())).transform(
  map(peek),
  map(app),
  updateDOM({
    root,
    span: false,
    ctx: {
      run: x => run$.next(x),
      state: $store$, // TODO: example of using cursors for local state
      theme: THEME,
      // remove any staging path components (e.g., gh-pages)
      parseURL: () => parse_URL(window.location.href.replace(/ac\//g, ""))
    }
  })
)

console.log({ parse_URL: parse_URL(window.location.href) })
console.log("starting...")
