import { stream } from "@thi.ng/rstream"
import { streamCMD$, registerCMD } from "../src/registers"
import { traceStream } from "../src/utils"
import { command$, task$ } from "../src/streams"

// traceStream("command$ -> ", command$)
// traceStream("task$ -> ", task$)

let test$ = stream()

let CMD_static_payload = {
  sub$: "NOOP",
  args: "where is the fruit?"
}

let CMD_bundle_fn = {
  sub$: "TEST",
  args: x => ({ data: x })
}

let inbound_stream_PL = streamCMD$(test$, CMD_static_payload)
let inbound_stream_FN = streamCMD$(test$, CMD_bundle_fn)

// 📌 TODO: figure out a way to register a factory function
let test_CMD = {
  sub$: "TEST",
  path: ["warren", "buffet"]
}

let test_FN = x => console.log("GOT A TEST:", x)

// gives you back a constant that you can use in-situ
// useful convention: input_output -> for command chaining
let string_log = registerCMD(test_CMD, test_FN)
// registered stream emmissions are now connected to
// handlers
test$.next("💃")

// this doesn't work... yet
inbound_stream_PL.next("🍌")

// but once we've registered
let emit_log = registerCMD(CMD_static_payload, test_FN)

inbound_stream_PL.next("🍑")

// you can also use the returned stream from streamCMD$ to
// inject emissions directly therein
inbound_stream_FN.next("😍")
