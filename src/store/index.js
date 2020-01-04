import { setIn } from "@thi.ng/paths"
import { Atom } from "@thi.ng/atom"

// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const stateAtom = new Atom({ route_path: [], route_loading: false })

// sets a value within the global atom by path/lens
export const setState = (path, val) =>
  stateAtom.swap(state => setIn(state, path, val))

export const routeLoadingState = stateAtom.addView("route_loading")
export const routePathState = stateAtom.addView("route_path")
