import { setIn } from "@thi.ng/paths"
import { Atom, Cursor } from "@thi.ng/atom"

export const ROUTE_PATH = "ROUTE_PATH"
export const ROUTE_LOADING = "ROUTE_LOADING"
export const PAGE_TEMPLATE = "PAGE_TEMPLATE"
// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const $store$ = new Atom({
  [ROUTE_PATH]: [], // home page / defaults to empty path
  [ROUTE_LOADING]: false,
  [PAGE_TEMPLATE]: "div", // defaults to plain <div>
  root: ""
})

const $routeLoading$ = new Cursor($store$, ROUTE_LOADING)
const $routePath$ = new Cursor($store$, ROUTE_PATH)
const $page$ = new Cursor($store$, PAGE_TEMPLATE)

// sets a value within the global atom by path/lens

export const $routeLoading = $store$.addView(ROUTE_LOADING)
export const $routePath = $store$.addView(ROUTE_PATH)
export const $page = $store$.addView(PAGE_TEMPLATE)

export const set$State = (path, val) =>
  $store$.swap(state => setIn(state, path, val))

export const set$Route = val => $routePath$.reset(val)
export const set$Loading = val => $routeLoading$.reset(val)
export const set$Page = val => $page$.reset(val)
