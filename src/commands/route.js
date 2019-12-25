import { map } from "@thi.ng/transducers"
import { stream } from "@thi.ng/rstream"
import * as xf from "@thi.ng/transducers"
import { parse_href } from "../utils"
import {
  popstate$,
  DOMContentLoaded$,
  navigated$,
  sidechainNav$,
  route$
} from "../browser"
import { command$ } from "../streams"
// 📌 TODO: change to a component

const async_route = stream()

/**
 * represents the actual routing event stream that triggers:
 * A: history.pushState event (changes browser URL)
 * B: dispatches custom 'page-ready' event used for prerender
 * */
sidechainNav$.subscribe(
  xf.map(x => {
    history.pushState(
      parse_href(x[0].target.location.href),
      null,
      x[0].target.location.href
    )
    document.dispatchEvent(new Event("page-ready"))
  })
)

// link clicking
export const hurl_link = e => {
  e.preventDefault()
  console.log(e.target.href)
  if (window.location.href === e.target.href) return

  popstate$.next({
    target: {
      location: e.target
    }
  })
  return e
  // history.pushState(parse_hurl(e.target.href), null, e.target.href)
}

//https://stackoverflow.com/questions/3163615/how-to-scroll-html-page-to-given-anchor
export const hash_handler = hash => (location.hash = "#" + hash)

// or
// someDOMNode.scrollIntoView();
export const trigger_async_route = arg => route$.next(arg)
/**
 * takes a `hurl_router` (configured routing fn) and applies the router on
 * every emission of the browser navigation stream (a stream of nav events)
 * the returned dispatching function allows the user to hook into the data
 * emitted as per her router configuration and deploy some function thereupon
 * @returns hurl_dispatch - an event listener for dispatching
 * */
export const register_router_BOM = hurl_router => {
  navigated$.subscribe(
    // trace("route"),
    xf.map(x => hurl_router(x.target.location.href))
  )
  return hurl_dispatch
}

//
//                              d8
//   e88~~\  e88~-_  888-~88e _d88__
//  d888    d888   i 888  888  888
//  8888    8888   | 888  888  888
//  Y888    Y888   ' 888  888  888   d88b d88b d88b
//   "88__/  "88_-~  888  888  "88_/ Y88P Y88P Y88P
//
//

export const hurl_data_stream = stream()
/**
 * preconfigured dispatch from hurl_data_stream
 * this is an event handler that subscribes to the
 * `hurl_data_stream` internally and applies a user-defined callback `fn`
 * to every emission of data from the stream
 * */
export const hurl_dispatch = fn => hurl_data_stream.subscribe(map(x => fn(x)))

/**
 * Takes a routing configuration function and returns a router that
 * recieves a stream of incomming URLs/ and applies the configuration
 * to each one. Once the data is resolved for the URL, dispatches to a
 * completion stream to actually triggers a change in the browser router
 * @requires http://thi.ng/EquivMap
 *
 * ```js
 * const getSomeJSON = async (query, path, b) => {
 *   const base = "https://jsonplaceholder.typicode.com/"
 *   const data = b
 *     ? await fetch(`${base}${path}/${b}`).then(r => r.json())
 *     : await fetch(`${base}${path}/`).then(r => r.json())
 *   return data
 * }
 * const routes = async state => {
 *   let {
 *     subdomain,       // array
 *     domain,           // array
 *     path: [p_a, p_b], // array
 *     query,            // object
 *     hash              // string
 *   } = state
 *
 *   return await new EquivMap([
 *     [{ ...state, path: ["todos"] },      getSomeJSON(query, "todos")],
 *     [{ ...state, path: ["todos", p_b] }, getSomeJSON(query, "todos", p_b)],
 *     [{ ...state, path: ["users"] },      getSomeJSON(query, "users")],
 *     [{ ...state, path: ["users", p_b] }, getSomeJSON(query, "users", p_b)]
 *   ]).get(state)) || null
 * }
 * export const router = hurl_router(routes)
 * ```
 * */
export const hurl_router = config_fn => async h => {
  const state = parse_href(h)
  // log("state:", state)
  let data = await config_fn(state)
  hurl_data_stream.next({ hurl_data: data, hurl_state: state })
  trigger_async_route(true)
}
