import * as rs from "@thi.ng/rstream"
import * as xf from "@thi.ng/transducers"
// import * as cx from "@thi.ng/checks"
// import { Atom, Cursor } from "@thi.ng/atom"
// import { Channel } from "@thi.ng/csp"
// import { fromChannel } from "@thi.ng/rstream-csp"
import fetch from "node-fetch"

//  888                        ,e,
//  888-~88e    /~~~8e   d88~\  "   e88~~\
//  888  888b       88b C888   888 d888
//  888  8888  e88~-888  Y88b  888 8888
//  888  888P C888  888   888D 888 Y888
//  888-_88"   "88_-888 \_88P  888  "88__/

// stream src function takes a stream instance and provokes it
let ex_seed = s => {
  s.next("starting ex_seed...")
  //=> next = provoke propagation
  s.done()
  //=> done = terminate stream
}

let ex1 = rs.stream(ex_seed)
// create a single subscription
ex1.subscribe(rs.trace("ex_seed_sub:"))

/* trace logs:
ex_seed_sub: starting ex_seed...

ex_seed_sub: done
*/

// only the first subscriber will succeed if the stream is done()
// ex1.subscribe(rs.trace("ex_seed_sub2"))
//=> illegal state: operation not allowed in state 2

// for multiple subs
let ex_basic = rs.stream()
let ex_basic_sub1 = ex_basic.subscribe(rs.trace("ex_basic_sub1"))
let ex_basic_sub2 = ex_basic.subscribe(rs.trace("ex_basic_sub2"))
// provoke from "outside"
ex_basic.next("starting ex_basic...")
/* trace logs (notice order):
ex_basic_sub2 starting ex_basic...

ex_basic_sub1 starting ex_basic...
*/

// stream()s are also subscriptions
ex_basic_sub1.deref()
//=> starting ex_basic...
ex_basic_sub2.deref()
//=> starting ex_basic...
ex_basic.deref()
//=> starting ex_basic...

//             88~\
//  Y88b  /  _888__  e88~-_  888-~\ 888-~88e-~88e
//   Y88b/    888   d888   i 888    888  888  888
//    Y88b    888   8888   | 888    888  888  888
//    /Y88b   888   Y888   ' 888    888  888  888
//   /  Y88b  888    "88_-~  888    888  888  888

// the first arg can be a sub (e.g., `rs.trace()`), but can be null or transducer (2nd arg)
let ex_basic_xf = ex_basic.subscribe(xf.map(x => `characters = ${x.length}`))

let ex_basic_xf2 = ex_basic.subscribe(
  xf.comp(
    xf.map(x => `chars: ${x.length}`),
    xf.map(c => `prepended! ${c}`)
  )
)

ex_basic_xf.deref() //?
//=> characters = 15
ex_basic_xf2.deref() //?
ex_basic.done()
/* trace logs:
ex_basic_sub1 done

ex_basic_sub2 done
*/

//              d8
//    /~~~8e  _d88__  e88~-_  888-~88e-~88e
//        88b  888   d888   i 888  888  888
//   e88~-888  888   8888   | 888  888  888
//  C888  888  888   Y888   ' 888  888  888
//   "88_-888  "88_/  "88_-~  888  888  888
/**

let db = new Atom({ a: 23, b: 88 })
let cursor = new Cursor(db, "a")

let ex_atom = rs.fromAtom(db).subscribe(rs.trace("ex_atom:"))
//=> ex_atom: { a: 23, b: 88 }

cursor.reset(42)
//=> ex_atom: { a: 42, b: 88 }

ex_atom.deref()
//=> { a: 42, b: 88 }

**/

//                                          ,e,
//  888-~88e  888-~\  e88~-_  888-~88e-~88e  "   d88~\  e88~~8e
//  888  888b 888    d888   i 888  888  888 888 C888   d888  88b
//  888  8888 888    8888   | 888  888  888 888  Y88b  8888__888
//  888  888P 888    Y888   ' 888  888  888 888   888D Y888    ,
//  888-_88"  888     "88_-~  888  888  888 888 \_88P   "88___/
//  888

let todos_URL = "https://jsonplaceholder.typicode.com/todos/1"
let promise_ex = fetch(todos_URL).then(r => r.json())

rs.fromPromise(promise_ex).subscribe(rs.trace("ex_promise:"))
/* trace logs:
ex_promise: {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}

ex_promise: done
*/

//          888
//   e88~~\ 888-~88e   /~~~8e  888-~88e
//  d888    888  888       88b 888  888
//  8888    888  888  e88~-888 888  888
//  Y888    888  888 C888  888 888  888
//   "88__/ 888  888  "88_-888 888  888

/**
let ch = new Channel()
let ex_chan = fromChannel(ch)

ex_chan.subscribe(rs.trace("ex_chan:"))
ex_chan.subscribe(rs.trace("ex_chan evens:"), xf.filter(cx.isEven))

ch.write(1)
//=> ex_chan: 1

ch.write(2)
//=> ex_chan evens: 2
//=> ex_chan: 2

ex_chan.subscribe(
  rs.trace("ex_chan x 10:"),
  xf.map(x => x * 10)
)
//=> ex_chan x 10: 10
//=> ex_chan x 10: 20

**/
//  d88~\ Y88b  / 888-~88e  e88~~\
//  C888    Y888/  888  888 d888
//   Y88b    Y8/   888  888 8888
//    888D    Y    888  888 Y888
//  \_88P    /     888  888  "88__/
//         _/

// source: https://github.com/thi-ng/umbrella/blob/master/packages/rstream/src/stream-sync.ts#L20

let ex_sync1 = rs.stream()
let ex_sync2 = rs.stream()
ex_sync1.id //=> 'stream-13'
ex_sync2.id //=> 'stream-14'
// collected values are sent as labeled tuple object to downstream subscribers
// Each value in the emitted tuple objects is stored under their input stream's ID by default.
let ex_sync_src_arr = rs
  .sync({ src: [ex_sync1, ex_sync2] })
  .subscribe(rs.trace("ex_sync_src_arr:"))
ex_sync1.next(1)
// waits for es6_02 ...
ex_sync2.next(3)
//=> ex_sync_src_arr: { 'stream-13': 1, 'stream-14': 3 }

// with transducers
let ex_sync3 = rs.stream()
var xform = xf.map(x => `xform -> ${JSON.stringify(x)}`)
// if src is defined as an object, its keys will be used instead of the stream ID
rs.sync({ src: { ex_sync1, ex_sync3 }, xform }).subscribe(
  rs.trace("ex_sync_src_obj_xf:")
)
//=> ex_sync_src_obj_xf: xform -> { "ex_sync1": 1, "ex_sync3": 5 }
// provoke sync
ex_sync3.next(5)

// UNDER THE HOOD START /////////////////////////////////////

// source: https://github.com/thi-ng/umbrella/blob/master/packages/transducers/src/xform/partition-sync.ts

// reset behavior: partitionSync transducer (upon which `rs.sync` is built):
let ex_UTH = [
  ["a", 1],
  ["a", 2],
  ["d", 100],
  ["b", 10],
  ["b", 11],
  ["c", 0],
  ["a", 3]
]

// reset: false (default for rs.sync()) = any new value forces emission of *all* latest vals
let sync_UTH_reset_false = [
  ...xf.partitionSync(["a", "c"], { key: x => x[0], reset: false }, ex_UTH)
]
//=> [ { a: [ 'a', 2 ], c: [ 'c', 0 ] }, { a: [ 'a', 3 ], c: [ 'c', 0 ] } ]

// reset: true = previous vals are shed
let sync_UTH_reset_true = [
  ...xf.partitionSync(["a", "c"], { key: x => x[0], reset: true }, ex_UTH)
]
//=> [ { a: [ 'a', 2 ], c: [ 'c', 0 ] }, { a: [ 'a', 3 ] } ]

// all: false = only allow complete tuples
let sync_UTH_all_true = [
  ...xf.partitionSync(["a", "c"], { key: x => x[0], all: false }, ex_UTH)
]
//=> [ { a: [ 'a', 2 ], c: [ 'c', 0 ] } ]

// mergeOnly: true = synchrony no longer enforced, effectively ~ rs.merge()
let sync_UTH_mergeOnly_true = [
  ...xf.partitionSync(["a", "c"], { key: x => x[0], mergeOnly: true }, ex_UTH)
]
//=> [ { a: [ 'a', 1 ] }, { a: [ 'a', 2 ] }, { c: [ 'c', 0 ] }, { a: [ 'a', 3 ] } ]

// UNDER THE HOOD END /////////////////////////////////////

// closing behavior

// if `close: false` (default = true), rs.sync stays alive when inputs are done()
let ex_sync_close_false = rs
  .sync({ src: { ex_sync1, ex_sync3 }, close: false })
  .subscribe(rs.trace("ex_sync_close_false:"))
//=> ex_sync_close_false: { ex_sync1: 1, ex_sync3: 5 }
ex_sync1.done()
ex_sync_src_arr.deref() //=> { 'stream-13': 1, 'stream-14': 3 }
ex_sync2.done()
ex_sync_src_arr.deref() //=> undefined
ex_sync_close_false.deref() //=> { ex_sync1: 1, ex_sync3: 5 }

//                     888       ,d88~~\          888
//  888-~88e  888  888 888-~88e  8888    888  888 888-~88e
//  888  888b 888  888 888  888b `Y88b   888  888 888  888b
//  888  8888 888  888 888  8888  `Y88b, 888  888 888  8888
//  888  888P 888  888 888  888P    8888 888  888 888  888P
//  888-_88"  "88_-888 888-_88"  \__88P' "88_-888 888-_88"
//  888

// source: https://github.com/thi-ng/umbrella/blob/master/packages/rstream/test/pubsub.ts

let streamy_butt = rs.stream()

let ex_pub_01 = rs.pubsub({
  // topic = test decides what the topic is
  topic: x => Object.keys(x)[0],
  id: "ex_pub_01"
})

// dynamic pubsub subscription (ad-hoc attachment)
// simple sub (input)
let ex_pubsub_basic = ex_pub_01.subscribeTopic(
  "_fetch",
  rs.trace("ex_pubsub_basic")
)

ex_pub_01.next({ _fetch: "noop" })
//=> ex_pubsub_basic { fetch: 'noop' }

let fetch_handler = x =>
  fetch(x)
    .then(r => r.json())
    .catch(e => `error for _fetch opts: ${x} = ${e.message}`)

// 📌 TODO: connect to sidechain (instead of rs.trace())
let ex_pubsub_fetch_handler = ({ _fetch }) =>
  rs
    .fromPromise(fetch_handler(_fetch))
    .subscribe(rs.trace("ex_pubsub_fetch_handler:"))

// dispatch to another stream based on topic (output)
ex_pub_01.subscribeTopic("_fetch", xf.map(ex_pubsub_fetch_handler))

let pub_URL = "https://jsonplaceholder.typicode.com/users/1"
ex_pub_01.next({ _fetch: pub_URL })
/* trace logs:
ex_pubsub_fetch_handler: error for _fetch opts: noop = Only absolute URLs are supported

ex_pubsub_fetch_handler: done

ex_pubsub_fetch_handler: { id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address:
   { street: 'Kulas Light',
     suite: 'Apt. 556',
     city: 'Gwenborough',
     zipcode: '92998-3874',
     geo: { lat: '-37.3159', lng: '81.1496' } },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company:
   { name: 'Romaguera-Crona',
     catchPhrase: 'Multi-layered client-server neural-net',
     bs: 'harness real-time e-markets' } }

ex_pubsub_fetch_handler: done
*/
// latest values are deref()able
ex_pubsub_basic.deref()
//=> { _fetch: 'https://jsonplaceholder.typicode.com/users/1' }

//         ,e,       888                   888                ,e,
//   d88~\  "   e88~\888  e88~~8e   e88~~\ 888-~88e   /~~~8e   "  888-~88e
//  C888   888 d888  888 d888  88b d888    888  888       88b 888 888  888
//   Y88b  888 8888  888 8888__888 8888    888  888  e88~-888 888 888  888
//    888D 888 Y888  888 Y888    , Y888    888  888 C888  888 888 888  888
//  \_88P  888  "88_/888  "88___/   "88__/ 888  888  "88_-888 888 888  888

let ex_sidechain = rs.stream()
let ex_sidechain_trigger = rs.stream()

// basic sidechain (sidechain vals are ignored and only used for trigger)
ex_sidechain
  .subscribe(rs.sidechainPartition(ex_sidechain_trigger))
  .subscribe(rs.trace("ex_sidechain"))

ex_sidechain.next({ hi: "I was first" })
ex_sidechain.next({ hi: "I was second" })
ex_sidechain.next({ hi: "I was third" })
//=> no trace... waiting for trigger
ex_sidechain.deref() //=> { hi: 'I was third' }
ex_sidechain_trigger.next(0)
//=> ex_sidechain [ { hi: 'I was first' }, { hi: 'I was second' }, { hi: 'I was third' } ]
ex_sidechain_trigger.next(1)
//=> no trace... no vals from source
ex_sidechain.next({ hi: "I was forth" })
// => no trace... trigger (1) happened before forth and fifth
ex_sidechain_trigger.next(2)
// => ex_sidechain [ { hi: 'I was forth' } ]

let testi = [1, 2, 3] //?
let testi1 = testi.unshift(4)
testi //?
