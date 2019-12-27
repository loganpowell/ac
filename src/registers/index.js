/**
 * @module Registers
 */
import { command$, task$, out$ } from "../streams"
import { isFunction } from "@thi.ng/checks"
import { map, comp, pluck } from "@thi.ng/transducers"
import { unknown_key_ERR } from "../utils"
import { trace } from "@thi.ng/rstream"

// abbreviated mult-use error checker for this scope
let check4errors = (CMD, return_args) => {
  let { sub$, args, path, ...unknown } = CMD

  if (Object.keys(unknown).length > 0)
    throw new Error(unknown_key_ERR(CMD, unknown, sub$))

  return args
}

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
 * ```js
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
 * ```
 * @param {Command} stream_command Command to dispatch
 * events from the included `src$` (the upstream producer)
 * to downstream consumers/handlers registered to listen for
 * the included `sub$`
 * @param {function} xform optional transducer to preprocess
 * streamed vals before dispatching Commands downstream
 */
export const streamCMD$ = (src$, command, xform) => {
  // 📌 TODO: register factory function

  let { sub$, args, path, ...unknown } = command

  let is_fn = isFunction(args)

  if (Object.keys(unknown).length > 0) {
    throw new Error(unknown_key_ERR("`streamCMD$`", command, unknown, sub$))
  }

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
 * Register ad-hoc upstream producers into the `task$`
 * stream
 *
 * Takes a stream `src$`, a `task` (or subtask) and an
 * optional transducer and returns a subscription attached
 * to the `task$` stream to chain the emissions from one to
 * the other
 *
 */
export const streamTask$ = (src$, task_or_subtask, xform) => {
  let is_fn = isFunction(task_or_subtask)

  let check = is_fn ? task_or_subtask() : task_or_subtask

  check.foreach(CMD => {
    let { sub$, args, path, ...unknown } = CMD

    if (Object.keys(unknown).length > 0) {
      throw new Error(unknown_key_ERR("`streamTask$`", CMD, unknown, sub$))
    }
  })

  let feed = $ => {
    if (xform && is_fn) {
      return comp(
        xform,
        map(x => $.next(task_or_subtask(x)))
      )
    } else if (xform && !is_fn) {
      return comp(
        xform,
        map(() => $.next(task_or_subtask))
      )
    } else if (is_fn) {
      return map(x => $.next(task_or_subtask(x)))
    } else return map(() => $.next(task_or_subtask))
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
 * @param {Command} command an object with three
 * required keys (`sub$`, `args`, `handler`)
 *
 */
export const registerCMD = (command, handler) => {
  // 📌 TODO: register factory function

  let { sub$, args, path, ...unknown } = command

  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */
  if (Object.keys(unknown).length > 0) {
    throw new Error(unknown_key_ERR("`registerCMD`", command, unknown, sub$))
  }

  out$
    .subscribeTopic(sub$)
    .subscribe({ next: handler, error: console.warn }, pluck("args"))

  return command
}
