import { setIn } from '@thi.ng/paths'
import { Atom } from '@thi.ng/atom'

// Global State Container from [@thi.ng/atom](http://thi.ng/atom)
export const $store$ = new Atom({
  _route_path: [],
  _route_loading: false,
  _page: '',
  _root: {}
})

// sets a value within the global atom by path/lens

export const $routeLoading$ = $store$.addView('_route_loading')
export const $routePath$ = $store$.addView('_route_path')
export const $page$ = $store$.addView('_page')

export const set$State = (p, val) => $store$.swap(state => setIn(state, p, val))
export const set$Route = val => $store$.resetIn('_route_path', val)
export const set$Loading = val => $store$.resetIn('_route_loading', val)
export const set$Page = val => $store$.resetIn('_page', val)
export const set$Root = val => $store$.resetIn('_root', val)

// export const set$FLIP = ([k, v]) =>
//   $store$.swap(state => setIn(state, "_flip_els", state._flip_els.set(k, v)))
