/**
 * @module registerCMD
 */
import { command$, out$ } from "../streams"
import { isFunction } from "@thi.ng/checks"
import { map, pluck, selectKeys } from "@thi.ng/transducers"
import { unknown_key_ERR } from "../utils"

const feedCMD$fromSource$ = ({ sub$, args, path, source$ }) => {
  let is_fn = isFunction(args)
  let deliver = x => ({ sub$, args: args(x), path })
  let delivery = { sub$, args, path }

  let feed = $ => {
    if (is_fn) {
      return map(x => $.next(deliver(x)))
    } else return map(() => $.next(delivery))
  }
  // looks for the `sub$` key to determine if its a command
  return source$.subscribe(feed(command$))
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
 * 📌 what does registration do to the registered and what does the result look like, short and sweet
 * ```
 * @param {Command} stream_command Command to dispatch
 * events from the included `src$` (the upstream producer)
 * to downstream consumers/handlers registered to listen for
 * the included `sub$`
 * @param {function} xform optional transducer to preprocess
 * streamed vals before dispatching Commands downstream
 */

/**
 *
 * ## `register_command`
 *
 * Takes a Command object with some additional information
 * and returns a Command usable in a Task or as-is. This
 * also serves the additional benefit of giving the user a
 * constant to use instead of making any typos in keys
 * during use.
 *
 * ### Destructuring Behavior
 *
 * During a `sub$` registration, the keys in the Command
 * object are used to determine the signature of incoming
 * Commands. In order to reduce the amount of boilerplate
 * for Commands that only contain the `sub$` and `args` key,
 * the `args` key is
 * [pluck](https://github.com/thi-ng/umbrella/blob/master/packages/transducers/src/xform/pluck.ts)ed
 * from the incoming Commands. This pulls the `args` value
 * out from the incoming Command objects to be used directly
 * (without the need for dstructuring).
 *
 * ### Example
 *
 * ```js
 * import { registerCMD, run$ } from "🍎"
 *
 * const cmd_pathless = {
 *   sub$: "PATHLESS",
 *   args: { static: "payload" }
 * }
 *
 * const pathless_handler = x => console.log("pathless ->", x)
 *
 * const CMD_PATHLESS = registerCMD(cmd_pathless, pathless_handler)
 *
 * run$.next(CMD_PATHLESS) // 🏃
 * // pathless -> { static: 'payload' }
 *
 * const cmd_path = {
 *   sub$: "PATH",
 *   args: { static: "payload" },
 *   path: ["default", "path"]
 * }
 *
 * const path_handler = x => console.log("path ->", x)
 *
 * const CMD_PATH = registerCMD(cmd_path, path_handler)
 *
 * run$.next(CMD_PATH) // 🏃
 * // path -> { args: { static: 'payload' }, path: [ 'default', 'path' ] }
 *
 * const test_pathless = {
 *   sub$: "PATHLESS",
 *   args: "🔥"
 * }
 *
 * run$.next(test_pathless) // 🏃
 * // pathless -> "🔥"
 * // as you can see, the Command args have been plucked out
 *
 * const test_path = {
 *   sub$: "PATH",
 *   args: "🌊",
 *   path: ["new", "path"]
 * }
 *
 * run$.next(test_path) // 🏃
 * // path -> { args: '🌊', path: [ 'new', 'path' ] }
 * // only the sub$ entry has been removed leaving the rest
 *
 * // NOW: Let's stick these into a Task
 * let TASK_1 = [
 *   { ...CMD_PATH, path: "overwritten" },
 *   CMD_PATHLESS,
 *   { ...test_path, args: "🍝" }
 * ]
 * run$.next(TASK_1)
 * // path -> { args: { static: 'payload' }, path: 'overwritten' }
 * // pathless -> { static: 'payload' }
 * // path -> { args: '🍝', path: [ 'new', 'path' ] }
 *
 * ```
 *
 * @param {Command} command an object with three required
 * keys (`sub$`, `args`, `handler`)
 *
 */
export const registerCMD = command => {
  // 📌 TODO: register factory function

  let { sub$, args, path, source$, handler, ...unknown } = command

  let xform = path ? selectKeys(["path", "args"]) : pluck("args")

  /**
   * destructure the args component out of the emissions
   * to save the user from having to do that PITA everytime
   */
  if (Object.keys(unknown).length > 0) {
    throw new Error(
      unknown_key_ERR("Command Registration", command, unknown, sub$, undefined)
    )
  }
  if (source$) feedCMD$fromSource$(command)

  // more: https://github.com/thi-ng/umbrella/blob/develop/examples/rstream-event-loop/src/events.ts
  out$.subscribeTopic(sub$, { next: handler, error: console.warn })

  let CMD = { sub$, args, path }

  return CMD
}
