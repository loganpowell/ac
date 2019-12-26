import { stream } from "@thi.ng/rstream"
import { registerStreamCMD, registerCMD } from "../src/registers"
import { traceStream } from "../src/utils"
import { command$, task$ } from "../src/streams"

// traceStream("command$ -> ", command$)
// traceStream("task$ -> ", task$)

let test$ = stream()

let test_command = {
  src$: stream(),
  sub$: "TEST",
  args: { data: "lots of 💩" }
}

let test_command_fn = {
  src$: test$,
  sub$: "COMMAND1",
  args: x => ({ data: x })
}

let inbound_stream = registerStreamCMD(test_command)
let inbound_stream3 = registerStreamCMD(test_command_fn)
registerStreamCMD(test_command_fn)

let data_logger = {
  sub$: "COMMAND1",
  args: x => console.log("GOT SOME DATA:", x),
  path: ["coca", "cola"]
}

// 📌 TODO: figure out a way to register a factory function
let test_handler_fn = {
  sub$: "TEST",
  args: x => console.log("GOT A TEST:", x),
  path: ["warren", "buffet"]
}

let data_log = registerCMD(data_logger)

data_log //?

let data_log_fn = registerCMD(test_handler_fn)

test$.next("🍑")
test$.next("😍")
test$.next("💃")

inbound_stream.next("hello")
inbound_stream3.next("😱")
