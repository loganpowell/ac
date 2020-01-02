import { parse_href } from "../utils"
import { navigated$ } from "../DOM"
import { registerCMD } from "../register"
import { map } from "@thi.ng/transducers"
import { EquivMap } from "@thi.ng/associative"
import { setIn } from "@thi.ng/paths"
import { Atom } from "@thi.ng/atom"
import { fromAtom } from "@thi.ng/rstream"
import { task$ } from "../streams"
import { Flipper } from "flip-toolkit"
import qs from "querystring"

import fetch from "node-fetch"
import { isObject } from "util"

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
  const img_rand = "https://picsum.photos/seed/picsum/600/800"

  const data = b
    ? {
        img: img_base(b),
        text: await fetch(`${text_base}${path}/${b}`).then(r => r.json())
      }
    : {
        img: img_rand,
        text: await fetch(`${text_base}${path}/`).then(r => r.json())
      }
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
const router = async href => {
  let parsed_href = parse_href(href)
  let {
    subdomain, // array
    domain, // array
    path, // array
    query, // object
    hash // string
  } = parsed_href
  let [p_a, p_b] = path

  let state =
    new EquivMap([
      [
        { ...parsed_href, path: ["todos"] },
        { data: await getSomeJSON("todos"), spec: "something" }
      ],
      [
        { ...parsed_href, path: ["todos", p_b] },
        { data: await getSomeJSON("todos", p_b), spec: "else" }
      ],
      [
        { ...parsed_href, path: ["users"] },
        { data: await getSomeJSON("users"), spec: "ass" }
      ],
      [
        { ...parsed_href, path: ["users", p_b] },
        { data: await getSomeJSON("users", p_b), spec: "bloop" }
      ]
    ]).get(parsed_href) || null

  return { state, path }
}

router({ href: "/todos/1" }) //?

//
//    d8                      d8
//  _d88__  e88~~8e   d88~\ _d88__
//   888   d888  88b C888    888
//   888   8888__888  Y88b   888
//   888   Y888    ,   888D  888
//   "88_/  "88___/  \_88P   "88_/
//
//

// first the command... then the handler
// command
export const I_pushState_href = {
  sub$: "pushstate",
  args: ({ href }) => ({ href })
}

/** or maybe the handler is defined as a part of the
 * Command and destructured out like this:
 * ```js
 * export const I_pushState_href = {
 *  sub$: "pushstate",
 *  args: ({ href }) => ({ href }) // <- implied/unnecessary?
 *  handler: ({ href }) => href_pushState(href)
 * }
 * ````
 * And then the actual defHandler takes that and just gives
 * back the Command without the handler!?
 */

// handler
export const HREFpushState = href => {
  history.pushState(parse_href(href), null, href)
  document.dispatchEvent(new Event("page-ready")) //👀 for prerenderer,
}

// To register or not to register...
const popstate2route = {
  sub$: "HREF_STATE",
  args: ({ href }) => "insert Task",
  source$: navigated$
}

let href2data = {
  // (1) => Promise
  args: ({ href }) => router(href),
  reso: ""
}

const data2atom = registerCMD({
  sub$: "STATE",
  handler: ({ data }) => "setIn(Atom, path, data)",
  path: "put into a subtask"
})

const href2route = registerCMD({
  sub$: "HREF_ROUTE",
  handler: ({ href }) => href_pushState(href)
})

/**
 * PSEUDO
 *
 * User inputs:
 * - Routing EquivMap -> data & spec(?)
 * - "STATE" event -> takes spec for route and applies it to
 *   data
 * - Self-hydrating Atom -> to instatiate your app, the user
 *   assigns cursors to an atom for each route (path)
 * - START with the API
 * I have:
 * - actions -> route
 * - actions -> state
 * - route$ -> actions
 *
 * API needed:
 * - upstream (tasks/commands)
 * - downstream (routes/specs) (startup tasks? - based on URL)
 *
 * task:
 * - registerRouter(routerFn)
 * - route$(EquivMap) -> { state: { body, head }, path: [] }
 * - "STATE" -> setIn(Atom, path, state)
 * -
 */

let DB = new Atom({})

const route_UI = registerCMD({
  sub$: "ROUTE",
  source$: navigated$,
  args: e => (e.preventDefault(), { href: e.target.value.href, event: e }),
  handler: ({ href }) => task$.next(routeSubtask({ href }))
})
// prettier-ignore

const data_deps_FLIP = {
  to: "document.querySelector <- class",
  id: "",
  from: "",
  ignore: "",

}

/**
 *
 * href->FLIP
 *
 * deps:
 * - parse_href components
 *  - path
 *  - query
 *  - hash
 * - targets:
 *  - if old_path === new_path && old_hash !== new_hash -> get all #ids of surrounding list
 *  - if old_path !== new_path && Math.sign(direction) === -1
 *
 *
 * compositor-friendly CSS Props:
 * - Rotate
 * - Opacity
 * - Matrix
 * - Position
 * - Scale
 * - Skew
 *
 */

parse_href("https://api.me.io/data/to?get=NAME&in=state#indeed") //?
parse_href("../data/to?get=NAME&in=state#indeed") //?
parse_href("./data/to?get=NAME&in=state#indeed") //?
parse_href("/data/to?get=NAME&in=state#indeed") //?
parse_href("data/to?get=NAME&in=state#indeed") //?

let path1 = ["path", "one"]
let path2 = ["path", "one", "deeper"]
let path3 = ["path"]
let path4 = ["path", "two"]
let path5 = ["new", "path"]
let path6 = ["new", "two"]

const path_diff = ({ old_path, new_path }) => {
  let direction = new_path.length - old_path.length
  let overlap = new_path.map((c, i, d) => {
    return c === old_path[i] ? c : 1
  })
  if (new_path.length < old_path.length) overlap.push(-1)
  return overlap
}

path_diff({ old_path: path2, new_path: path1 }) //?
// single targets (zoom)
// zoom in => [ 'path', 'one', 1 ]
// zoom out => [ 'path', 'one', -1 ]
// single target (pivot)
// many targets (shift)
