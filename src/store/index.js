import { setIn } from "@thi.ng/paths"
import { Atom } from "@thi.ng/atom"

// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const $store$ = new Atom({
  route_path: [],
  route_loading: false,
  page: ""
})

// sets a value within the global atom by path/lens
export const set$tate = (path, val) =>
  $store$.swap(state => setIn(state, path, val))

export const $routeLoading$ = $store$.addView("route_loading")
export const $routePath$ = $store$.addView("route_path")
export const $page$ = $store$.addView("page")
