import { Atom } from "@thi.ng/atom"
import { isPlainObject, isArray } from "@thi.ng/checks"

// parse_URL constants
export const DOM = "DOM"
export const URL = "URL"
export const URL_path = "URL_path"
export const URL_data = "URL_data"
export const URL_domain = "URL_domain"
export const URL_query = "URL_query"
export const URL_hash = "URL_hash"
export const URL_page = "URL_page"

// optional router metadata constants
export const BODY = "BODY"
export const HEAD = "HEAD"
export const pre = "pre"
export const post = "post"
export const router = "router"

// state setting Command constants
export const sub$ = "sub$"
export const args = "args"
export const reso = "reso"
export const erro = "erro"
export const handler = "handler"
export const source$ = "source$"
export const STATE = "STATE"
export const PATH = "PATH"

// boot config constants
export const run = "run"
export const state = "state"
export const parseURL = "parseURL"

// Global state keys/constants
export const ROUTE_PATH = "_ROUTE_PATH"
export const ROUTE_LOADING = "_ROUTE_LOADING"
export const PAGE_TEMPLATE = "_PAGE_TEMPLATE"
export const ROOT = "_ROOT"

export const DEFAULT_CFG = {
  [ROUTE_PATH]: null, // home page / defaults to empty path
  [ROUTE_LOADING]: true,
  [PAGE_TEMPLATE]: null,
  [ROOT]: null
}
// Global $store$ Container from [@thi.ng/atom](http://thi.ng/atom)
export let $store$ = new Atom(DEFAULT_CFG)

/**
 *
 *  Swaps the current value at the given path/lens into the
 *  global store with that of the given value. Checks to see
 *  if that value should be either spread into an existing
 *  object or a complete replacement
 *
 */
export const set$State = (path, val) =>
  $store$.swapIn(path, x =>
    !path.length && !isPlainObject(val)
      ? { ...x, [val]: val }
      : isPlainObject(x) && isPlainObject(val)
      ? { ...x, ...val }
      : val
  )
// $store$.resetIn(path, val)
