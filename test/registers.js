import { stream } from "@thi.ng/rstream"
import { registerStream$, register_command } from "../src/registers"
import { traceStream } from "../src/utils"
import { command$, task$ } from "../src/streams"

traceStream("command$ -> ", command$)
traceStream("task$ -> ", task$)

let test$ = stream()

let test_command = {
  sub$: "TEST",
  args: { data: "lots of data" }
}

let test_command_fn = x => ({
  sub$: "COMMAND1",
  args: { data: x }
})

registerStream$(test$, test_command)
registerStream$(test$, test_command_fn)

let test_handler = {
  sub$: "COMMAND1",
  args: ({ data }) => ({ data }),
  handler: x => console.log("GOT SOME DATA:", x)
}

let data_log = register_command(test_handler)

test$.next("bloop")
// test$.next("bloop")
test$.next(data_log)

console.log("done")
