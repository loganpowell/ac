import { getIn } from "@thi.ng/paths"
import { isArray, isObject } from "@thi.ng/checks"
import { EquivMap } from "@thi.ng/associative"
import { start } from "@thi.ng/hdom"

import { register, commands, utils, store, streams } from "../../src"
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
const { run$ /* command$, task$ */ } = streams
const { registerRouterDOM } = register
const { HURL, INJECT_HEAD_CMD } = commands
const { parse_URL, navFLIPzoom /* traceStream */ } = utils
const { $routePath$, $store$ } = store
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
  const img_base = (id, sz) =>
    `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`

  const data = uid
    ? {
        head: {
          title: `User ${uid} Details`,
          description: `Detail page for user ${uid}`,
          image: img_base(uid, 600)
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
            image: img_base(222, 600)
          },
          body: list.map((c, i) => ({
            img: img_base(i + 1, 600),
            text: c,
            uid: i + 1,
            path
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
      { URL_data: () => getSomeJSON("todos"), URL_page: "todos" }
    ],
    [
      { ...match, URL_path: ["todos", p_b] },
      { URL_data: () => getSomeJSON("todos", p_b), URL_page: "todo" }
    ],
    [
      { ...match, URL_path: ["users"] },
      { URL_data: () => getSomeJSON("users"), URL_page: "users" }
    ],
    [
      { ...match, URL_path: ["users", p_b] },
      { URL_data: () => getSomeJSON("users", p_b), URL_page: "user" }
    ]
  ]).get(match) || {
    URL_data: () => ({
      head: {
        title: `Demo Home Page`,
        description: `Welcome to the Demo`,
        image: "https://i.picsum.photos/id/222/600/600.jpg"
      },
      body: { home: "homepage" }
    }),
    URL_page: "bloop"
  } // should probably be a 404... also need a match for an empty path: []

  // console.log("router called", { page, data: await data() })
  return { URL_page, URL_data: await URL_data() }
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

const pathLink = (ctx, id, ...args) => [
  "a",
  {
    href: `${$routePath$.deref()}/${id}`,
    onclick: e => {
      e.preventDefault()
      HURL(e)
      // ⚠ NTS: Head metadata is persisted across nav:
      // ⚠ consider batching all such mutations into a component
    },
    style: { "font-size": ".5rem", "background-color": "white", padding: "3px" }
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
            width: "100px",
            "font-size": ".5rem",
            "vertical-align": "middle",
            "margin-bottom": "20px"
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
            width: "100px",
            overflow: "hidden",
            opacity: 1,
            // overlapping siblings
            "margin-bottom": "-20px"
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

/* ⚙ HOF COMPONENT ⚙ */
const zoomOnNav = (ctx, uid, path, img, sz) => [
  navFLIPzoom({
    id: img + "_div",
    href: `${[path, uid].join("/")}`,
    target: div
  }),
  img,
  sz
]

//////////////////// FLIP API 🔺  //////////////////////////

const component = sz => {
  return (ctx, uid, path, img, fields) => [
    "div",
    { class: "card" },
    [zoomOnNav, uid, path, img, sz], //[FLIP_img, img]],
    ["p", { class: "title" }, fields]
  ]
}

const link = (ctx, path, ...args) => [
  "a",
  {
    href: "/" + path.join("/"),
    onclick: e => HURL(e)
  },
  ...args
]

const page = (ctx, { body }) => {
  return [
    "div",
    { style: { "max-width": "30rem", margin: "auto" } },
    ...[["users"], ["todos", 2], ["users", 9]].map(path => [
      link,
      path,
      `${path[0]} ${path[1] ? "->" + path[1] : ""}`,
      ["br"]
    ]),
    isArray(body)
      ? [
          "div",
          ...body.map(({ img, text, uid, path }) => [
            component("sm"),
            uid,
            path,
            img,
            fields(text)
          ])
        ]
      : [
          component("lg"),
          getIn(body, "uid"),
          getIn(body, "path"),
          getIn(body, "img")
            ? body.img
            : "https://i.picsum.photos/id/111/600/600.jpg",
          getIn(body, "text") ? fields(body.text.company || body.text) : null
        ]
  ]
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

const router = {
  router: routerCfg,
  post: INJECT_HEAD_CMD
}

registerRouterDOM(router)

// ✈ MOVE to register/ ✈

const root = document.getElementById("app")
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
