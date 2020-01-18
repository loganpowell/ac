import { setIn } from "@thi.ng/paths"
import { Atom, Cursor } from "@thi.ng/atom"

// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const $store$ = new Atom({
  _route_path: [],
  _route_loading: false,
  _page: "",
  _root: ""
})

// sets a value within the global atom by path/lens

export const $routeLoading$ = new Cursor($store$, "_route_loading")
export const $routePath$ = $store$.addView("_route_path")
export const $template$ = $store$.addView("template")

export const set$State = (path, val) =>
  $store$.swap(state => setIn(state, path, val))
export const set$Route = val => set$State("_route_path", val)
export const set$Loading = val => $routeLoading$.reset(val)
export const set$Template = val => set$State("template", val)
export const set$Root = val => set$State("_root", val)

// export const set$FLIP = ([k, v]) =>
//   $store$.swap(state => setIn(state, "_flip_els", state._flip_els.set(k, v)))
