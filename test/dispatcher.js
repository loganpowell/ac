import fetch from "node-fetch"
import { stream, trace } from "@thi.ng/rstream"
import { command$ } from "../src/streams"
import { dispatcher } from "../src/dispatcher"
import { traceStream, parse_href } from "../src/utils"

//
//    d8                      d8
//  _d88__  e88~~8e   d88~\ _d88__
//   888   d888  88b C888    888
//   888   8888__888  Y88b   888
//   888   Y888    ,   888D  888
//   "88_/  "88___/  \_88P   "88_/
//
//

let test_stream$ = stream().subscribe(trace("log ->"))

let testicular = [
  {
    sub$: "butt",
    args: "monkey"
  },
  {
    sub$: "init",
    args: { href: "https://jsonplaceholder.typicode.com/users/" }
  },
  {
    sub$: "filter",
    args: ({ href }) => ({ href: href + "1" })
  },
  {
    sub$: "butt",
    args: "money"
  },
  {
    // if the xf returns a promise, it is resolved before
    // passing
    sub$: "fetch",
    args: ({ href }) => fetch(href).then(r => r.json()),
    // splitting behavior
    // dispatch to next (invoker .next triggers)
    reso: (state, res) => ({ data: res }),
    // dispatched to alternative stream (invoker .next
    // errors) and triggers.cancel() also consider just
    // `throw`ing:
    // https://github.com/thi-ng/umbrella/tree/master/packages/rstream#conceptual-differences-to-rxjs
    erro: (state, err) => ({ sub$: "cancel", args: err })
  },
  {
    sub$: "filter",
    args: ({ href }) => ({ href: href.slice(0, -1) + "4" })
  },
  state => route(state),
  {
    sub$: "filter",
    args: ({ href }) => ({ href: href.slice(0, -1) + "6" })
  }
]
// Lower Order Trigger (on triggers.next("route") )
let route = state => [
  {
    args: state
  },
  {
    sub$: "FLIP",
    // options (1):
    // https://github.com/davidkpiano/flipping#new-flippingoptions
    // options (2):
    // https://github.com/aholachek/react-flip-toolkit/tree/7382f9380200f5a85296621db852ea2513cc5eec/packages/flip-toolkit
    args: "start"
  },
  {
    sub$: test_stream$,
    args: () => ({ sub$: "x", args: "SOMTHING ELSE" })
  },
  {
    sub$: "state",
    path: ["header"],
    args: {
      meta: {
        "og:description": "social media antisocial people",
        "og:type": "website",
        "og:url": state.href,
        "og:image:width": 1000,
        "og:image:height": 1200
      }
    }
  },
  {
    sub$: "state",
    path: ["body", "content"],
    args: { data: state.data }
  },
  {
    sub$: "state",
    path: ["just", "🍑y"],
    args: false
  },
  {
    sub$: "state",
    path: ["route"],
    args: { route: "parse_URL()" }
  },
  {
    sub$: "pushstate",
    args: { route: "route overwritten  🔥" }
  },
  {
    sub$: "FLIP",
    args: "done"
  }
]

//
//           d8                      d8
//   d88~\ _d88__   /~~~8e  888-~\ _d88__
//  C888    888         88b 888     888
//   Y88b   888    e88~-888 888     888
//    888D  888   C888  888 888     888
//  \_88P   "88_/  "88_-888 888     "88_/
//
//
traceStream("comm ->", command$)

dispatcher(testicular) //?
