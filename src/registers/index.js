/**
 * @module Registers
 */
import { command$, task$, out$ } from "../streams"
import { isFunction } from "@thi.ng/checks"
import { map, comp, pluck } from "@thi.ng/transducers"
import { unknown_key_ERR } from "../utils"
import { trace } from "@thi.ng/rstream"

let fix_jsdoc

/**
 *
 * ## `registerStreamCMD`
 *
 * Provides a way to register ad-hoc upstream producers into
 * the `command$` stream
 *
 * Takes a `stream_command` and an optional transducer and
 * returns a subscription attached to the `command$` stream
 * to chain the emissions from one to the other
 *
 * @example
 *
 * let test$ = stream()
 *
 * let src$_CMD_payload = {
 *   src$: stream(),
 *   sub$: "TEST",
 *   args: { data: "lots of 💩" }
 * }
 *
 * let src$_CMD_fn = {
 *   src$: test$,
 *   sub$: "COMMAND1",
 *   args: x => ({ data: x })
 * }
 *
 * let inbound_stream = registerStreamCMD(src$_CMD_payload)
 * let inbound_stream3 = registerStreamCMD(src$_CMD_fn)
 *
 * @param {Command} stream_command Command to dispatch
 * events from the included `src$` (the upstream producer)
 * to downstream consumers/handlers registered to listen for
 * the included `sub$`
 * @param {function} xform optional transducer to preprocess
 * streamed vals before dispatching Commands downstream
 */
export const registerStreamCMD = (stream_command, xform) => {
  let is_fn = isFunction(args)
  let { src$, sub$, args } = stream_command
  let feed = $ => {
    if (xform && is_fn) {
      return comp(
        xform,
        map(x => $.next({ sub$, args: args(x) }))
      )
    } else if (xform && !is_fn) {
      return comp(
        xform,
        map(() => $.next({ sub$, args }))
      )
    } else if (is_fn) {
      return map(x => $.next({ sub$, args: args(x) }))
    } else return map(() => $.next({ sub$, args }))
  }
  // looks for the `sub$` key to determine if its a command
  return src$.subscribe(feed(command$))
}

/**
 *
 * ## `registerStreamTask`
 *
 * Provides a way to register ad-hoc upstream producers into
 * the task$ stream
 *
 * Takes a stream `src$` and an optional transducer and
 * returns a subscription attached to the `task$` stream to
 * chain the emissions from one to the other
 *
 * registers injection stream w/either command$ or task$
 * stream
 *
 * @param {Command} stream_command Command to dispatch
 * events from the included `src$` (the upstream producer)
 * to downstream consumers/handlers registered to listen for
 * the included `sub$`
 * @param {function} xform optional transducer to preprocess
 * streamed vals before dispatching Commands downstream
 */
export const registerStreamTask = (src$, task, xform) => {
  let is_fn = isFunction(task)
  let feed = $ => {
    if (xform && is_fn) {
      return comp(
        xform,
        map(x => $.next(task(x)))
      )
    } else if (xform && !is_fn) {
      return comp(
        xform,
        map(() => $.next(task))
      )
    } else if (is_fn) {
      return map(x => $.next(task(x)))
    } else return map(() => $.next(task))
  }
  return src$.subscribe(feed(task$))
}
/**
 *
 * `register_command`
 *
 * Takes a Command object with some additional information
 * and returns a Command usable in a Task or as-is. This also
 * serves the additional benefit of giving the user a constant
 * to use instead of making any typos in keys and
 *
 * ### Example
 *
 * ```js
 * import { route } from "./my_little_router"
 *
 * const href_route = O_defHandler$({
 *  sub$: "ROUTE",
 *  args: ({ href }) => ({ href }),
 *  handler: ({ href }) => route(href)
 * })
 * ```
 * returns:
 * ```js
 * console.log(href_route)
 * //-> { sub$: "ROUTE", args: ({ href }) => ({ href }) }
 * ```
 *
 * @param {Command} command_w_handler an object with three
 * required keys (`sub$`, `args`, `handler`)
 *
 */
export const registerCMD = command_w_handler => {
  // 📌 TODO: register factory function
  let CMD = { ...command_w_handler }

  let { sub$, args, path, ...unknown } = CMD

  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */
  if (Object.keys(unknown).length > 0)
    throw new Error(unknown_key_ERR(command_w_handler, unknown, sub$))

  out$
    .subscribeTopic(sub$)
    .subscribe({ next: args, error: console.warn }, pluck("args"))

  delete CMD["args"]
  return CMD
}
