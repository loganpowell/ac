import { register, commands, utils, store } from "../src"

const { registerRouterDOM } = register
const { clickEventHandlerDOM } = commands
const { parse_URL, traceStream } = utils
const { routePathState, stateAtom } = store

import { updateDOM } from "@thi.ng/transducers-hdom"
import { fromAtom } from "@thi.ng/rstream"
import { getIn } from "@thi.ng/paths"
import { run$, out$, command$, task$, navigated$ } from "../src/streams"
import { isArray } from "@thi.ng/checks"
import { deepTransform } from "@thi.ng/transducers"
import { start } from "@thi.ng/hdom"
import { EquivMap } from "@thi.ng/associative"

import fetch from "node-fetch"

// traceStream("run$ ->", run$)
traceStream("command$ ->", command$)
// traceStream("task$ ->", task$)
traceStream("out$ ->", out$)
// traceStream("navigated$ ->", navigated$)
//
//    d8                      d8
//  _d88__  e88~~8e   d88~\ _d88__
//   888   d888  88b C888    888
//   888   8888__888  Y88b   888
//   888   Y888    ,   888D  888
//   "88_/  "88___/  \_88P   "88_/
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
 * users to not only see that beauty, but also be made aware
 * of this powerful dependency, so they could take it with
 * them to put up against other problems.
 *
 * Value semantics have so many benefits. As a router,
 * here's one.
 */
const router = async url => {
  let matchingComponents = parse_URL(url)
  let {
    URL,
    URL_subdomain, // array
    URL_domain, // array
    URL_path, // array
    URL_query, // object
    URL_hash // string
  } = matchingComponents
  let [p_a, p_b] = URL_path

  let { data, page } = new EquivMap([
    [
      { ...matchingComponents, URL_path: ["todos"] },
      { data: () => getSomeJSON("todos"), page: "todo" }
    ],
    [
      { ...matchingComponents, URL_path: ["todos", p_b] },
      { data: () => getSomeJSON("todos", p_b), page: "" }
    ],
    [
      { ...matchingComponents, URL_path: ["users"] },
      { data: () => getSomeJSON("users"), page: "ass" }
    ],
    [
      { ...matchingComponents, URL_path: ["users", p_b] },
      { data: () => getSomeJSON("users", p_b), page: "bloop" }
    ]
  ]).get(matchingComponents) || {
    data: () => ({ home: "page" }),
    page: "bloop"
  } // should probably be a 404... also need a match for an empty path: []

  console.log("router called")
  return { page, data: await data() }
}

// router({ hurl: "/todos/1" }) //?

registerRouterDOM(router)

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
    console.log("STATE:", stateAtom.deref())
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

// TODO
// {
//   "img": "https://i.picsum.photos/id/1/600/600.jpg",
//   "text": {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }
// }

const image = (ctx, img) => ["img", { src: img }]
const component = (ctx, img, title) => [
  "div",
  {},
  [image, img],
  ["p", { class: "title" }, title]
]
const UI_todo = (ctx, payload) => {
  return isArray(payload)
    ? [
        "div",
        ...payload.map(({ img, text }) => [
          component,
          img,
          `${text.title || text.name}`
        ])
      ]
    : [
        component,
        payload && payload.img ? payload.img : "n/a",
        payload && payload.text
          ? payload.text.title || payload.text.name
          : "n/a"
      ]
}
// return ["pre", JSON.stringify(state, null, 2)]

//
//        /           d8b
//  e88~88e  e88~-_  !Y88!
//  888 888 d888   i  Y8Y
//  "88_88" 8888   |   8
//   /      Y888   '   e
//  Cb       "88_-~   "8"
//   Y8""8D
//

start(
  // 📌 page component that chooses a template based on the spec returned
  ({ run$, state }) => [UI_todo, getIn(state.deref(), routePathState.deref())],
  {
    root: document.getElementById("app"),
    ctx: { run$, state: stateAtom }
  }
)
