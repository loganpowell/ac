import { register, commands, utils, store, streams } from "../src"

const { run$, command$, task$, out$, DOMnavigated$ } = streams
const { registerRouterDOM } = register
const { clickEventHandlerDOM } = commands
const { parse_URL, traceStream, initFLIP } = utils
const { $routePath$: $routePath$, $store$, set$tate } = store

import { getIn } from "@thi.ng/paths"
import { isArray, isObject } from "@thi.ng/checks"
import { start } from "@thi.ng/hdom"
import { EquivMap } from "@thi.ng/associative"

// import fetch from "node-fetch"

traceStream("run$ ->", run$)
traceStream("command$ ->", command$)
traceStream("task$ ->", task$)
traceStream("out$ ->", out$)
traceStream("navigated$ ->", DOMnavigated$)

//
//    d8                      d8
//  _d88__  e88~~8e   d88~\ _d88__
//   888   d888  88b C888    888
//   888   8888__888  Y88b   888
//   888   Y888    ,   888D  888
//   "88_/  "88___/  \_88P   "88_/
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
 * users to not only see that beauty, but also be made aware
 * of this powerful dependency, so they could take it with
 * them to put up against other problems.
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
  let [_, p_b] = URL_path

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

  console.log("router called", { page, data: await data() })
  return { page, data: await data() }
}

// router({ hurl: "/todos/1" }) //?

//
//                        ,d
//   e88~~8e  Y88b  /  ,d888
//  d888  88b  Y88b/     888
//  8888__888   Y88b     888
//  Y888    ,   /Y88b    888
//   "88___/   /  Y88b   888
//
//

let links = document.querySelectorAll("a")

links.forEach(x => {
  x.addEventListener("click", e => {
    console.log("STATE:", $store$.deref())
    clickEventHandlerDOM(e)
  })
})

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

const link = ({ $store$ }, id, text) => [
  "a",
  {
    href: `${$store$.value.route_path}/${id}`,
    onclick: e => clickEventHandlerDOM(e)
  },
  text
]

const field = (ctx, key, val) => [
  "li",
  { style: { display: "flex" } },
  key === "id" ? [link, val, val] : ["p", { style: { padding: "0 0.5rem" } }, key],
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
    src: img,
    style: { "object-fit": "cover", "min-height": "100%", "min-width": "100%" }
    // style: { height: "600px", width: "600px" }
  }
]

const FLIP_img = {
  init: (el, { $store$ }, uid) => initFLIP(el, $store$, uid),
  render: (ctx, img) => [image, img]
}

const div = (ctx, uid, sz, ...args) => [
  "div",
  {
    style:
      sz === "sm"
        ? {
            height: "100px",
            overflow: "hidden"
          }
        : {
            height: "80vh",
            overflow: "hidden"
          }
  },
  ...args
]

const FLIP_div = {
  init: (el, { $store$ }, uid, ...args) => initFLIP(el, $store$, uid),
  render: (ctx, id, ...args) => [div, id, ...args]
}

const component = sz => {
  return (ctx, img, fields) => [
    "div",
    { class: "flip" },
    [FLIP_div, img + "div", sz, [FLIP_img, img]],
    ["p", { class: "title" }, fields]
  ]
}

const page = (ctx, payload) => {
  return [
    "div",
    { style: { "max-width": "30rem", margin: "auto" } },
    isArray(payload)
      ? ["div", ...payload.map(({ img, text }) => [component("sm"), img, fields(text)])]
      : [
          component("lg"),
          payload && payload.img ? payload.img : "https://i.picsum.photos/id/111/600/600.jpg",
          payload && payload.text ? fields(payload.text.company || payload.text) : null
        ]
  ]
}

registerRouterDOM(router)

// ✈ MOVE to register/ ✈
const registerRootByID = id => {
  set$tate("_root", id)
  return document.getElementById(id)
}
const root = registerRootByID("app")

// consider abstracting this (just hand it a `router` Map,
// `page` object and an "id")
start(
  // 📌 page component that chooses a template based on the spec returned
  ({ $store$ }) => [page, getIn($store$.deref(), $routePath$.deref())],
  {
    root,
    ctx: { run$, $store$ },
    span: false
  }
)
