/**
 @module Streams
*/
import { fromDOMEvent, merge, pubsub, stream, trace } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import { spool } from "../spool"

export const log$ = stream().subscribe(trace("log$ -> "), { id: "log$" })

/**
 * # Stream Architecture:
 *
 * `run$` is the primary event stream exposed to the user
 * via the `ctx` object injected into every `hdom` component
 * the command stream is the only way the user changes
 * anything in `hurl`
 *
 * ## Marble Diagram
 *
 * ```
 * 0>- |------c-----------c--[~a~b~a~]-a----c-> : calls
 * 1>- |ps|---1-----------1----------0-1----1-> : run$
 * 2>- |t0|---------a~~b~~~~~~~~~~~a~*--------> : task$
 * 3>- |t1|---c-----------c------------a----c-> : command$
 * 4>- ---|ps|c-----a--b--c--------a---a----c-> : out$
 * Handlers
 * a>- ---|ta|------*--------------*---*------> : registerCMD
 * b>- ---|tb|---------*----------------------> : registerCMD
 * c>- ---|tc|*-----------*-----------------*-> : registerCMD
 * ```
 *
 * ## Streams
 *
 * - `0>-`: `ctx.run$.next(x)` userland dispatches
 * - `1>-`: `pubsub({ topic: x => x.length === 0 })` `run$`
 *   stream
 * - `2>-`: pubsub = `false` ? -> `task$` stream
 * - `3>-`: pubsub = `true` ? ->`command$` stream
 * - `4>-`: `pubsub({ topic: x => x.sub$ })`: `out$` stream
 *   -> `register_command`
 *
 * ## Handlers
 *
 * `4>-` this is the stream to which the user (and
 * framework) attaches handlers. Handlers receive events
 * they subscribe to as topics based on a `sub$` key in a
 * Command object.
 *
 * ### Handlers (framework provided):
 * - "state": Global state mutations
 * - "route": Routing
 * - "FLIP" :
 *   [F.L.I.P.](https://aerotwist.com/blog/flip-your-animations/)
 *   animations
 *
 * TODO:
 * - add __Examples__
 * - add `beforeunload` event handler within #4 (orphan):
 *    SEE https://youtu.be/QQukWZcIptM
 * - enable ctx.run.cancel() via external or internal events
 *    (e.g., popstate / { sub$:  "cancel" })
 *
 * ## `run$`
 *
 * User-land event dispatch stream
 *
 * This stream is directly exposed to users via `ctx` Any
 * one-off Commands `next`ed into this stream are sent to
 * the `command$` stream. Arrays of Commands (Tasks) are
 * sent to the `task$` stream.
 *
 */
export const run$ = pubsub({
  topic: x => !!x.sub$,
  id: "run$_stream",
  equiv: (x, y) => x === y || y === "_TRACE_STREAM"
})

/**
 * ## `out$`
 *
 * Primary user-land _READ_ stream. For attaching handlers
 * for responding to emmitted Commands
 *
 */
export const out$ = pubsub({
  topic: x => x.sub$,
  id: "out$_stream",
  equiv: (x, y) => x === y || y === "_TRACE_STREAM"
})

/**
 * ## `command$`
 *
 * Primary fork/bisect stream for indivual commands.
 * attached to a `pubsub` stemming from this stream. The
 * `topic` function used to alert downstream handlers is a
 * simple lookup of the `sub$` key of the command
 *
 */
export const command$ = run$.subscribeTopic(
  true,
  {
    next: x => out$.next(x),
    error: console.warn
  },
  { id: "command$_stream" }
)

/**
 * ## `task$`
 *
 * Batch processing stream, listens for Tasks sent as an
 * array of Commands (including subtask functions)
 *
 * stream (if array of event objects)
 *
 */
export const task$ = run$.subscribeTopic(
  false,
  {
    next: spool,
    error: console.warn
  },
  { id: "task$_stream" }
)

export const popstate$ = fromDOMEvent(window, "popstate")
export const DOMContentLoaded$ = fromDOMEvent(window, "DOMContentLoaded")

// example of custom stream dispatch (logging)
/**
 *
 * There are three types of navigation we need to handle:
 * 1. DOMContentLoaded (entering the site) events
 * 2. popstate (browser back/forward button clicks) events
 * 3. <a hurl="x"> (link clicking)
 *
 * These events have different payloads and need to be
 * harmonized in order to use them consistently
 *
 * ## getting the `hurl` property from the various events:
 * 1. ev.target.location.hurl
 * 2. ev.target.location.hurl
 * 3. ev.target.hurl
 *
 * for raw events, we can just transform them, but for link
 * clicking we need to convert/wrap it to align with the
 * destructuring of the others
 */
export const navigated$ = merge({
  src: [popstate$, DOMContentLoaded$]
}).transform(map(x => ({ URL: x.target.location.href, DOM: x.currentTarget })))
