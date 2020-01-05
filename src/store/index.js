import { setIn } from "@thi.ng/paths"
import { Atom } from "@thi.ng/atom"

// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const globalStore = new Atom({
  route_path: [],
  route_loading: false,
  page: ""
})

// sets a value within the global atom by path/lens
export const setState = (path, val) =>
  globalStore.swap(state => setIn(state, path, val))

export const routeLoadingState = globalStore.addView("route_loading")
export const routePathState = globalStore.addView("route_path")
export const pageState = globalStore.addView("page")
