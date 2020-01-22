import { parse_URL } from "../../src/utils"

parse_URL("https://loganpowell.github.io/ac/".replace(/ac\//g, "")) //?

const escape = string => string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")

new RegExp(escape("ac/"), "g") //?
