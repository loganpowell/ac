import { parse_href } from "../utils"
import { popstate$, navigated$ } from "../browser"
import { register_stream } from "../registers"
import { map } from "@thi.ng/transducers"

// first the command... then the handler
// command
export const I_pushState_href = {
  sub$: "pushstate",
  args: ({ href }) => ({ href })
}

/** or maybe the handler is defined as a part of the
 * Command and destructured out like this:
 * ```js
 * export const I_pushState_href = {
 *  sub$: "pushstate",
 *  args: ({ href }) => ({ href }) // <- implied/unnecessary?
 *  handler: ({ href }) => {
 *    history.pushState(parse_href(href), null, href)
 *    document.dispatchEvent(new Event("page-ready"))
 *  }
 * }
 * ````
 * And then the actual defHandler takes that and just gives
 * back the Command without the handler!?
 */

// handler
export const href_pushState_O = href => {
  history.pushState(parse_href(href), null, href)
  document.dispatchEvent(new Event("page-ready")) //👀 for prerenderer,
}
