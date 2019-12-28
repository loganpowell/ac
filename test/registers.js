import { stream } from "@thi.ng/rstream"
import { registerCMD } from "../src/registers"
import { traceStream } from "../src/utils"
import { isFunction } from "@thi.ng/checks"
import { command$, run$, task$, out$ } from "../src/streams"

// traceStream("run$ -> ", run$)
// traceStream("command$ -> ", command$)
// traceStream("task$ -> ", task$)
// traceStream("out-> ", out$)

// let x = [
//   { sub$: "PATH", args: { static: "payload" }, path: "overwritten" },
//   { sub$: "PATHLESS", args: { static: "payload" }, path: undefined },
//   { sub$: "PATH", args: { heart: "❤" }, path: ["new", "path"] }
// ]
// let test$ = stream()

// let SUB_NOOP = {
//   sub$: "NOOP",
//   args: "where is the fruit?",
//   path: "default.path"
// }

// let SUB_TEST_FN = {
//   sub$: "TEST",
//   args: x => ({ data: x })
//   // path: []
// }

// let inbound_stream_PL = streamCMD$(test$, SUB_NOOP)
// let inbound_stream_FN = streamCMD$(test$, SUB_TEST_FN)

// let SUB_NOOP_HANDLER = x => console.log("SUB_NOOP_HANDLER ->", x)
// let SUB_TEST_HANDLER = x => console.log("SUB_TEST_HANDLER ->", x)

// // gives you back a constant that you can use in-situ
// // useful convention: input_output -> for command chaining
// let str_log = registerCMD(SUB_TEST_FN, SUB_TEST_HANDLER)
// // registered stream emmissions are now connected to
// // handlers
// test$.next("💃")

// // this doesn't work... yet
// inbound_stream_PL.next("🍌")

// // but once we've registered
// let emit_log = registerCMD(SUB_NOOP, SUB_NOOP_HANDLER)

// inbound_stream_PL.next("🍑")

// // you can also use the returned stream from streamCMD$ to
// // inject emissions directly therein
// inbound_stream_FN.next("😍")

// let e1 = { sub$: "NOOP", args: "🔥", path: ["warren", "buffet"] }
// let e2 = { sub$: "TEST", args: "🔥" }
// let e3 = { sub$: "NADA", args: "🔥" }

// command$.next(e1)
// command$.next(e2)
// command$.next(e3)

// let TASK = [
//   e1,
//   {
//     ...e2,
//     path: ["charles", "peirce"]
//   },
//   e3
// ]

// run$.next(TASK)

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

// Advanced Task'ing:
// NOW: Let's stick these into a Task
let TASK_ADV = [
  CMD_PATHLESS,
  { ...test_path, args: { heart: "❤" } },
  { sub$: "PATH", args: x => ({ ...x, peach: "🍑" }) }
]
run$.next(TASK_ADV) //?
// pathless -> { static: 'payload' }
// path -> { args: { heart: '❤' }, path: [ 'new', 'path' ] }
// path -> { static: 'payload', heart: '❤', peach: '🍑' }

//
//                     ,d88~/\
//  888  888 888-~88e  8888/
//  888  888 888  888b `Y88b
//  888  888 888  8888  `Y88b,
//  888  888 888  888P   /8888
//  "88_-888 888-_88"  \/_88P'
//           888
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
