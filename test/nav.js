import { parse_href, traceStream } from "../src/utils"
import {
  navigated$,
  DOMClickEventHandler,
  registerDOMRouter,
  stateAtom as state
  // HREF_NAV$
} from "../src/DOM"
import { updateDOM } from "@thi.ng/transducers-hdom"
import { fromAtom } from "@thi.ng/rstream"
import { registerCMD } from "../src/register"
import { getIn } from "@thi.ng/paths"
import { run$ } from "../src/streams"
import { isPromise, isArray } from "@thi.ng/checks"
import { deepTransform } from "@thi.ng/transducers"
import { start } from "@thi.ng/hdom"
import { EquivMap } from "@thi.ng/associative"

import { Atom, Cursor } from "@thi.ng/atom"

import fetch from "node-fetch"

traceStream("run$ ->", run$)
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
const router = async hurl => {
  let parsed_href = parse_href(hurl)
  let {
    subdomain, // array
    domain, // array
    path, // array
    query, // object
    hash // string
  } = parsed_href
  let [p_a, p_b] = path

  let { data, spec } = new EquivMap([
    [
      { ...parsed_href, path: ["todos"] },
      { data: () => getSomeJSON("todos"), spec: "todo" }
    ],
    [
      { ...parsed_href, path: ["todos", p_b] },
      { data: () => getSomeJSON("todos", p_b), spec: "" }
    ],
    [
      { ...parsed_href, path: ["users"] },
      { data: () => getSomeJSON("users"), spec: "ass" }
    ],
    [
      { ...parsed_href, path: ["users", p_b] },
      { data: () => getSomeJSON("users", p_b), spec: "bloop" }
    ]
  ]).get(parsed_href) || {
    data: { home: "page" },
    spec: "bloop"
  } // should probably be a 404... also need a match for an empty path: []

  let state = { spec, data: await data() }
  console.log("router called")
  return { state, path, query, hash }
}

// router({ hurl: "/todos/1" }) //?

let NAV_CMD = registerDOMRouter(router)

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
    console.log("STATE:", state.deref())
    DOMClickEventHandler(e)
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
        payload.img,
        payload.text ? payload.text.title || payload.text.name : "n/a"
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

const route_path = state.addView("path")

start(
  ({ run$, state }) => [UI_todo, getIn(state.deref(), route_path.deref())],
  {
    root: document.getElementById("app"),
    ctx: { run$, state }
  }
)
