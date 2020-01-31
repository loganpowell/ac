import { getIn } from "@thi.ng/paths"
import { isObject } from "@thi.ng/checks"
import { EquivMap } from "@thi.ng/associative"

import scrolly from "@mapbox/scroll-restorer"
scrolly.start()

import { register, commands, utils, components, streams, store } from "../../src"
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
const { boot, registerCMD } = register
const { INJECT_HEAD_CMD, HURL_CMD } = commands
const { parse_URL, traceStream } = utils
const { FLIPkid } = components
const { $store$ } = store
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
//        888             d8
//   e88~\888   /~~~8e  _d88__   /~~~8e
//  d888  888       88b  888         88b
//  8888  888  e88~-888  888    e88~-888
//  Y888  888 C888  888  888   C888  888
//   "88_/888  "88_-888  "88_/  "88_-888
//
//

/**
 *
 * When using a router config object (rather than a plain
 * router function), payloads can also separate display data
 * under a `BODY` key to separate the content from any
 * metadata you may want to use in `pre`/`post`
 * Commands/Tasks. For example, the built-in
 * `INJECT_HEAD_CMD` pulls from a `HEAD` key in the payload.
 *
 * Regarding state MGMT: The payload (value) will be
 * destructured from the `BODY` to keep your lenses (paths)
 * and state clean. I.e., you do not have to destructure
 * this from your page/app template manually. However,
 * within a `pre`/`post` Command/Task, the user can/must
 * use/destructure `HEAD`/`POST` payloads for their own
 * needs
 *
 */
const getSomeJSON = async (path, uid) => {
  const text_base = "https://jsonplaceholder.typicode.com/"
  const img_base = (id, sz) => `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`

  const data = uid
    ? (async () => {
        let detail = await fetch(`${text_base}${path}/${uid}`).then(r => r.json())
        let {
          name = `User ${getIn(detail, "id")}`,
          company: { catchPhrase } = { catchPhrase: detail.title }
        } = detail
        return {
          HEAD: {
            title: `${name}'s Details`,
            description: `${name} handles ${catchPhrase}`,
            image: { url: img_base(uid, 600) }
          },
          BODY: {
            // lesson -> don't use the actual url as the uid (not flexible)
            img: img_base(uid, 600),
            // this needs fixin' 📌
            text: detail,
            uid
          }
        }
      })()
    : (async () => {
        let list = await fetch(`${text_base}${path}/`).then(r => r.json())
        return {
          HEAD: {
            title: `${path.replace(/^\w/, c => c.toUpperCase())} list`,
            description: `List page for ${path}`,
            image: { url: img_base(222, 200) }
          },
          BODY: list.map((c, i) => ({
            img: img_base(i + 1, 200),
            text: c,
            uid: i + 1
          }))
        }
      })()
  return data
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
  ]).get(match) || { URL_data: () => getSomeJSON("users", 12), URL_page: single }

  return { URL_data: await URL_data(), URL_page }
}

//
//  888            888
//  888-~88e  e88~\888  e88~-_  888-~88e-~88e
//  888  888 d888  888 d888   i 888  888  888
//  888  888 8888  888 8888   | 888  888  888
//  888  888 Y888  888 Y888   ' 888  888  888
//  888  888  "88_/888  "88_-~  888  888  888
//
//

//////////////////// FLIP API 🔻 //////////////////////////

// CHILD DEF: sig = (ctx, attrs, ...any)

const child = (ctx, id, img, sz, ...args) => [
  "img",
  {
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
            width: "600px"
          },
    href:
      sz === "sm" ? `/${ctx.parseURL().URL_path}/${id}` : `/${ctx.parseURL().URL_path.join("/")}`
  },
  ...args
]

const zoomOnNav = (ctx, id, img, sz) => [FLIPkid, [child, id, img, sz]]

//////////////////// FLIP API 🔺  //////////////////////////

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

// babel/core-js will complain if pages aren't defined
// before they're used even though eslint will allow it
const single = (ctx, body) =>
  // console.log({ body }),
  [
    component("lg"),
    getIn(body, "uid"),
    getIn(body, "img") || "https://i.picsum.photos/id/1/600/600.jpg",
    getIn(body, "text") ? fields(body.text.company || body.text) : null
  ]

const set = (ctx, bodies) => [
  "div",
  ...bodies.map(({ img, text, uid }) => [component("sm"), uid, img, fields(text)])
]

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
// TODO: example of using cursors for local state
const app = (ctx, page) =>
  // console.log(ctx.state),
  [
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
    page
  ]

// TODO: add default / 404 page here (could help the ugly $page.deref() ||...)
const router = {
  router: routerCfg,
  post: INJECT_HEAD_CMD
}

// const router = routerCfg

const w_config = {
  app,
  router,
  root: document.getElementById("app"), // <- 🔍
  // prefix: "ac/",
  // draft: { users: [] },
  // trace: "app stream ->",

  // arbitrary context k/v pairs...
  theme: THEME
}

boot(w_config)

// registerCMD({
//   sub$: "HURL_CMD",
//   args: x => x
// })

// console.log(registerCMD.all.entries())

console.log("starting...")
