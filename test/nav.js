import { parse_href, traceStream } from "../src/utils"
import { navigated$, navigateOnEvent, routerTask } from "../src/DOM"
import { registerCMD } from "../src/register"
import { run$ } from "../src/streams"
import { isPromise } from "@thi.ng/checks"
import { deepTransform } from "@thi.ng/transducers"
import { start } from "@thi.ng/hdom"
import { EquivMap } from "@thi.ng/associative"

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
        { data: await getSomeJSON("todos", p_b), spec: todo_spec }
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
  console.log("router called")
  return { state, path }
}

// router({ href: "/todos/1" }) //?

const img = img => ["img", { src: img }]
const title = title => ["p", title]
const completed = completed => (completed ? ["div", "✔"] : ["div", "❌"])

isPromise(router("/todos/1")) //?

let todo_spec = {
  img,
  text: [title, completed]
}
// getSomeJSON("todos", 1) //?
/*

{ img: 'https://i.picsum.photos/id/1/600/600.jpg',
  text: 
   { userId: 1,
     id: 1,
     title: 'delectus aut autem',
     completed: false } }

*/

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

console.log("loaded!")

//
//    d8              d8    d8b
//  _d88__ 888  888 _d88__ !Y88!
//   888   888  888  888    Y8Y
//   888   888  888  888     8
//   888   888  888  888     e
//   "88_/ "88_-888  "88_/  "8"
//
//

let route = routerTask(router)

const HREF_NAV$ = registerCMD({
  sub$: "HREF_NAV$",
  source$: navigated$,
  args: x => x,
  handler: x => run$.next(route(x))
})

let links = document.querySelectorAll("a")
links.forEach(x => {
  x.addEventListener("click", e => navigateOnEvent(e))
})

// const href2route = registerCMD({
//   sub$: "HREF_ROUTE",
//   handler: ({ href }) => href_pushState(href)
// })

// start(() => []
