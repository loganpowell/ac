import { getIn } from "@thi.ng/paths"
import { isObject } from "@thi.ng/checks"
import { EquivMap } from "@thi.ng/associative"
import { start } from "@thi.ng/hdom"

import { register, commands, utils, store, streams } from "../../src"
import { button_x } from "./components"
import { THEME } from "./theme"

import scrolly from "@mapbox/scroll-restorer"

scrolly.start()

// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
const { run$ /* command$, task$ */ } = streams
const { registerRouterDOM } = register
const { HURL, INJECT_HEAD_CMD } = commands
const { parse_URL, navFLIPzoom /* traceStream */ } = utils
const { $routePath$, $store$ } = store
// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .

const getSomeJSON = async (path, uid) => {
  const text_base = "https://jsonplaceholder.typicode.com/"
  const img_base = (id, sz) => `https://i.picsum.photos/id/${id}/${sz}/${sz}.jpg`

  const data = uid
    ? {
        head: {
          title: `User ${uid} Details`,
          description: `Detail page for user ${uid}`,
          image: { src: img_base(uid, 600) }
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
            image: { src: img_base(222, 600) }
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

const routerCfg = async url => {
  let match = parse_URL(url)
  let {
    URL_path // array
  } = match
  let [, p_b] = URL_path

  let { URL_data, URL_page } =
    new EquivMap([
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
      ],
      // home page (empty path)
      [
        { ...match, URL_path: [] },
        { URL_data: () => getSomeJSON("users", 1), URL_page: "user" }
      ]
    ]).get(match) || fourOfour

  // console.log("router called", { page, data: await data() })
  return { URL_data: await URL_data(), URL_page }
}

const fourOfour = {
  URL_data: () => ({
    head: {
      title: `Demo Home Page`,
      description: `Welcome to the Demo`,
      image: { src: "https://i.picsum.photos/id/222/600/600.jpg" },
      favicon: "https://www.favicon.cc/favicon/685/754/favicon.png"
    },
    body: { home: "homepage" }
  }),
  URL_page: "todo"
}

const btn_outline = button_x({ tag: "a" }, "buttons.outline")

const pathLink = (ctx, id, ...args) => [
  btn_outline,
  id === 3
    ? { disabled: true }
    : {
        href: `${$routePath$.deref()}/${id}`,
        onclick: e => {
          e.preventDefault()
          HURL(e)
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

const zoomOnNav = (ctx, uid, path, img, sz) => [
  navFLIPzoom({
    id: img + "_div",
    href: `${[path, uid].join("/")}`,
    target: div
  }),
  img,
  sz
]

const component = sz => {
  return (ctx, uid, path, img, fields) => [
    "div",
    { style: { "margin-bottom": "30px" } },
    [zoomOnNav, uid, path, img, sz],
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

const single = (ctx, body) => [
  component("lg"),
  getIn(body, "uid"),
  getIn(body, "path"),
  getIn(body, "img") || "https://i.picsum.photos/id/111/600/600.jpg",
  getIn(body, "text") ? fields(body.text.company || body.text) : null
]

const set = (ctx, bodies) => [
  "div",
  ...bodies.map(({ img, text, uid, path }) => [component("sm"), uid, path, img, fields(text)])
]

const page = (ctx, { body }, page) => {
  // console.log({ body, page })
  return [
    "div",
    { style: { "max-width": "30rem", margin: "auto", padding: "2rem" } },
    ...[["users"], ["todos", 2], ["users", 9]].map(path => [
      link,
      path,
      `${path[0]} ${path[1] ? "->" + path[1] : ""}`,
      ["br"]
    ]),
    [
      // page selection logic
      page === "todo"
        ? single
        : page === "todos"
        ? set
        : page === "user"
        ? single
        : page === "users"
        ? set
        : "div",
      body
    ]
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
start(
  ({ state }) => [
    page,
    // set defaults with || operators (needed before hydration)
    getIn(state.deref(), $routePath$.deref()).URL_data || { body: {} },
    getIn(state.deref(), $routePath$.deref()).URL_page || ""
  ],
  {
    root,
    ctx: { run$, state: $store$, theme: THEME },
    span: false
  }
)

console.log("starting...")
