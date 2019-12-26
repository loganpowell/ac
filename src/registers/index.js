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
 * ## `registerStream$`
 *
 * Provides a way to register ad-hoc upstream producers into
 * the command$ stream
 *
 * Takes a stream and an optional transducer and returns a
 * transducer to be attached to another stream to chain the
 * emissions from one to the other
 *
 * registers injection stream w/either command$ or task$
 * stream
 *
 * @param {Stream} stream$ the upstream producer
 * @param {Task | Command} task_or_command Command or Task
 * to dispatch on event
 * @param {function} xform optional transducer to preprocess
 * streamed vals before dispatching Command or Task
 * downstream
 */
export const registerStream$ = (stream$, task_or_command, xform) => {
  let TOC = task_or_command
  let is_fn = isFunction(TOC)
  let feed = $ => {
    if (xform && is_fn) {
      return comp(
        xform,
        map(x => $.next(TOC(x)))
      )
    } else if (xform && !is_fn) {
      return comp(
        xform,
        map(() => $.next(TOC))
      )
    } else if (is_fn) {
      return map(x => $.next(TOC(x)))
    } else return map(() => $.next(TOC))
  }
  // looks for the `sub$` key to determine if its a command
  return task_or_command.sub$ || task_or_command().sub$
    ? stream$.subscribe(feed(command$))
    : stream$.subscribe(feed(task$))
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
export const register_command = command_w_handler => {
  let { sub$, args, path, handler, erro, reso, ...unknown } = command_w_handler
  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */
  if (Object.keys(unknown).length > 0)
    throw new Error(unknown_key_ERR(command_w_handler, unknown, sub$))
  out$
    .subscribeTopic(sub$)
    .subscribe({ next: handler, error: console.warn }, pluck("args"))
  let command = { sub$, args, path, reso, erro }
  Object.keys(command).forEach(
    key => command[key] === undefined && delete command[key]
  )
  // console.log("command:", command)
  // console.log("command_w_handler:", command_w_handler)
  return command
}
