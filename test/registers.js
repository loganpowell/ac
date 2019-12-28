import { stream } from "@thi.ng/rstream"
import { registerCMD } from "../src/registers"
import { traceStream } from "../src/utils"
import { isFunction } from "@thi.ng/checks"
import { command$, run$, task$, out$ } from "../src/streams"
import fetch from "node-fetch"

// traceStream("run$ -> ", run$)
// traceStream("command$ -> ", command$)
// traceStream("task$ -> ", task$)
// traceStream("out-> ", out$)

//
//                         / ,e,          d8
//  888-~\  e88~~8e  e88~88e  "   d88~\ _d88__  e88~~8e  888-~\
//  888    d888  88b 888 888 888 C888    888   d888  88b 888
//  888    8888__888 "88_88" 888  Y88b   888   8888__888 888
//  888    Y888    ,  /      888   888D  888   Y888    , 888
//  888     "88___/  Cb      888 \_88P   "88_/  "88___/  888
//                    Y8""8D
//
/**
 *
 * | key      | value   | role(s)                                | required |
 * | -------- | ------- | -------------------------------------- | -------- |
 * | `sub$`   | String  | Topic ID: connects Command to handler  | always   |
 * | `args`   | Any     | Payload or payload function            | ad-hoc   |
 * | `path`   | Any     | Lens for global state evolution        | state    |
 * | `handler`| Function| Dispatches on Command                  | register |
 * | `source$`| Stream  | Upstream producer of Command           | ad-hoc   |
 *
 * Glossary:
 * ##### ad-hoc
 *
 * Only needed on demand/dispatch, not for registration
 * ##### always
 *
 * Needed for both registration and Command
 * invokation/dispatch
 * ##### register
 *
 * Only for `registerCMD`, i.e., for Command registration
 * ##### state
 *
 * Designed for use with - __built-in__ - global state
 * evolution functionality on the `sub$: "STATE"` Command
 */

const cmd_pathless = {
  sub$: "PATHLESS",
  args: { static: "payload" },
  handler: x => console.log("pathless ->", x)
}

const CMD_PATHLESS = registerCMD(cmd_pathless)

// run$.next(CMD_PATHLESS) // 🏃
// pathless -> { static: 'payload' }

const cmd_path = {
  sub$: "PATH",
  args: { static: "payload" },
  path: ["default", "path"],
  handler: x => console.log("path ->", x)
}

const CMD_PATH = registerCMD(cmd_path)

// run$.next(CMD_PATH) // 🏃
// path -> { args: { static: 'payload' }, path: [ 'default', 'path' ] }

const test_pathless = {
  sub$: "PATHLESS",
  args: { fire: "🔥" }
}

// run$.next(test_pathless) // 🏃
// pathless -> "🔥"
// as you can see, the Command args have been plucked out

const test_path = {
  sub$: "PATH",
  args: { water: "🌊" },
  path: ["new", "path"]
}

// run$.next(test_path) // 🏃
// path -> { args: '🌊', path: [ 'new', 'path' ] }
// only the sub$ entry has been removed leaving the rest

//
//    d8                    888   _
//  _d88__   /~~~8e   d88~\ 888 e~ ~   d88~\
//   888         88b C888   888d8b    C888
//   888    e88~-888  Y88b  888Y88b    Y88b
//   888   C888  888   888D 888 Y88b    888D
//   "88_/  "88_-888 \_88P  888  Y88b \_88P
//
//

/**
 *
 * 📌 TODO: put this doc into the `Streams` module above
 * `task$`
 *
 * Tasks are one of the big value propositions of the
 * framework. Though rather simple in implementation, it's a
 * powerful tool for composing asynchronous Commands
 * together.
 *
 * You can think of Commands like ingredients and Tasks like
 * recipes that take some ingredients and execute them in a
 * specific order
 *
 */

// NOW: Let's stick these into a Task
let TASK = [
  CMD_PATH,
  CMD_PATHLESS,
  { ...test_path, args: { heart: "❤" } },
  { sub$: "PATH", args: { peach: "🍑" } }
]
// run$.next(TASK) // 🏃
// path -> { args: { static: 'payload' }, path: [ 'default', 'path' ] }
// pathless -> { static: 'payload' }
// path -> { args: { heart: '❤' }, path: [ 'new', 'path' ] }
// path -> { peach: '🍑' }

//
//  Y8b                            Y8b
//   Y8b   /~~~8e   e88~~\  e88~~\  Y8b
//             88b d888    d888
//        e88~-888 8888    8888
//       C888  888 Y888    Y888
//        "88_-888  "88__/  "88__/
//
//

// state can be passed between Commands within a Task with a
// non-nullary function as the `args` value (`(1+) =>`).
// This value then represents an accumulator Object of
// any/all of the prior subtasks results who's `args`
// are/return an Object.

// Advanced Task'ing:
// NOW: Let's stick these into a Task
let TASK_ADV = [
  CMD_PATHLESS,
  { ...test_path, args: { heart: "❤" } },
  { sub$: "PATH", args: x => ({ ...x, peach: "🍑" }) }
]
run$.next(TASK_ADV)
// pathless -> { static: 'payload' }
// path -> { args: { heart: '❤' }, path: [ 'new', 'path' ] }
// path -> { static: 'payload', heart: '❤', peach: '🍑' }

// 📌 : SUBTASKS () => []

//
//  ,d88~~\          888         d8                    888   _
//  8888    888  888 888-~88e  _d88__   /~~~8e   d88~\ 888 e~ ~
//  `Y88b   888  888 888  888b  888         88b C888   888d8b
//   `Y88b, 888  888 888  8888  888    e88~-888  Y88b  888Y88b
//     8888 888  888 888  888P  888   C888  888   888D 888 Y88b
//  \__88P' "88_-888 888-_88"   "88_/  "88_-888 \_88P  888  Y88b
//
//

/**
 *
 * Tasks give you a way to compose Commands, but what if we
 * want to compose Tasks into larger/"higher-order" Tasks?
 * That's what Subtasks are for.
 *
 * Within a Task, you may refer to another Task by using a
 * `(A) => [T]` unary function that returns a Task. Within
 * this referenced Task, you may use the accumulator the
 * same way you do in a Task. For Example:
 *
 * Subtask definition
 * ```js
 * let subtask1 = ({ data, href }) => [
 *  { sub$: "acc"
 *  , path: ["body"]
 *  , args: { data } }, // <- uses accumulator
 *  { sub$: "route"
 *  , args: { route: { href } } } // <- uses accumulator
 * ]
 * ```
 * Use within a task
 * > Make sure any Subtask dependencies are made available
 * prior to insertion
 * ```js
 * let task = [
 * { args: { href: "https://my.io/todos" } }, // initializer
 * { sub$: "fetch"
 * , args: ({ href }) => fetch(href).then(r => r.json())
 * , erro: (acc, err) => ({ sub$: "cancel", args: err })
 * , reso: (acc, res) => ({ data: res }) },
 * acc => subtask1(acc), // <- USES SUBTASK
 * { sub$: "FLIP" , args: "done" }
 * ]
 *
 * ```
 *
 * Not only are Subtasks useful for including into
 * higher-order Tasks, but they can also be used with input
 * stream (producers), to be dispatched on single Commands.
 * This is especially handy when it's desireable to connect
 * an input stream emission to a sequence/cascade of Command
 *
 * Our Subtask
 * ```js
 * let subtask1 = ({ data, href }) => [{ sub$: "acc", path:
 *  ["body"], args: { data } }, { sub$: "route", args:
 *  {route: { href } } }
 * ]
 * ```
 * Register it with Command:
 * ```js
 * import { fromAtom } from "@thi.ng/rstream"
 * import { registerCMD, task$, run$ } from "🍎"
 *
 * let cmd_state_route = {
 *  sub$: "STATE_ROUTE",
 *  args: { data: "TBD", href: "TBD" },
 *  handler: x => task$.next(subtask(x))
 * }
 *
 * let CMD_STATE_ROUTE = registerCMD(cmd_state_route)
 *
 * let tasker = [
 *  {},
 *  {...CMD_STATE_ROUTE, args: () // 📌
 * ]
 * run$.next({...CMD_STATE_ROUTE, args: { data: {}
 * ```
 */
let subtask1 = ({ data, href }) => [
  { sub$: "SUBTASK", path: ["body"], args: { data } }, // <- uses accumulator
  { sub$: "SUBTASK", args: { route: { href } } } // <- uses accumulator
]
//prettier-ignore
let task = [
  { args: { href: "https://jsonplaceholder.typicode.com/todos/1" } }, // initializer
  { args: ({ href }) => fetch(href).then(r => r.json())
  , erro: (acc, err) => ({ sub$: "PATHLESS", args: err })
  , reso: (acc, res) => ({ data: res }) },
  acc => subtask1(acc), // <- USES SUBTASK
  { sub$: "SUBTASK", args: "done" }
]

let cmd_subtask = {
  sub$: "SUBTASK",
  handler: x => console.log("subtask ->", x)
}

let CMD_SUBTASK = registerCMD(cmd_subtask)

run$.next(task) // 🏃

// subtask -> { args:
//   { data:
//      { userId: 1,
//        id: 1,
//        title: 'delectus aut autem',
//        completed: false } },
//  path: [ 'body' ] }
//
// subtask -> { route: { href: 'https://jsonplaceholder.typicode.com/todos/1' } }

// subtask -> done

//
//                                                    ,d88~/\
//   d88~\  e88~-_  888  888 888-~\  e88~~\  e88~~8e  8888/
//  C888   d888   i 888  888 888    d888    d888  88b `Y88b
//   Y88b  8888   | 888  888 888    8888    8888__888  `Y88b,
//    888D Y888   ' 888  888 888    Y888    Y888    ,   /8888
//  \_88P   "88_-~  "88_-888 888     "88__/  "88___/  \/_88P'
//
//

// let's add some advanced functionality, adding an upstream
// producer of commands, not spawning from direct user
// invocation, but some other stream of things (powered by
// [@thi.ng/rstream](http://thi.ng/rstream) `<x>from`s

// const upstream$ = stream()

// const upstream_cmd = {
//   sub$: "UPSTREAM",
//   args: { static: "payload" },
//   handler: x => console.log("upstream ->", x),
//   source$: upstream$
// }

// const UPSTREAM_CMD = registerCMD(upstream_cmd)

// run$.next(UPSTREAM_CMD)
