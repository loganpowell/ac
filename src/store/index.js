import { setIn } from "@thi.ng/paths"
import { Atom, Cursor } from "@thi.ng/atom"

// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const $store$ = new Atom({
  _route_path: [], // home page / defaults to empty path
  _route_loading: false,
  _page_template: "div", // defaults to plain <div>
  _root: ""
})

// sets a value within the global atom by path/lens

export const $routeLoading$ = new Cursor($store$, "_route_loading")
export const $routePath$ = new Cursor($store$, "_route_path")
export const $page$ = new Cursor($store$, "_page_template")

export const set$State = (path, val) =>
  $store$.swap(state => setIn(state, path, val))

export const set$Route = val => $routePath$.reset(val)
export const set$Loading = val => $routeLoading$.reset(val)
export const set$Page = val => $page$.reset(val)
