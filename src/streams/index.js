/**
 @module Streams
*/
import { pubsub } from "@thi.ng/rstream"

/* ... */

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
 * 0>- |------c---------c--[ a, b, a ]-a----c-> : run$
 * 1>- |ps|---1---------1------------0-1----1-> : pubsub
 * 3>- ---|tp|------*-*-*----------*---*----*-> : command$
 * 2>- ---|tp|xf|---^-^------------^-?--------> : task$
 * 4>- ------|ps|--|a-b-c----------a---a----c-> : pubsub
 * Handlers
 * a>- ---------|tp|*--------------*---*------>
 * b>- ---------|tp|--*----------------------->
 * c>- ---------|tp|----*-------------------*->
 * ```
 *
 * ## Streams
 *
 * - `0>-`: `ctx.run$.next(x)` userland dispatch stream
 * - `1>-`: `pubsub({ topic: x => x.length === 0 })`
 * - `2>-`: pubsub = `false` ? -> `task$`: Task Dispatcher
 * - `3>-`: pubsub = `true` ? -> `command$`: Commands stream
 * - `4>-`: `pubsub({ topic: x => x.sub$ })`: userland
 *   handlers
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
export const run$ = pubsub({ topic: x => x.length === 0, id: "run_stream" })

/**
 * ## `command$`
 *
 * Primary read stream All user-defined handlers are
 * attached to a `pubsub` stemming from this stream. The
 * `topic` function used to alert downstream handlers is a
 * simple lookup of the `sub$` key of the command
 *
 */
export const command$ = run$.subscribeTopic(true)

/**
 * ## `task$`
 *
 * Batch processing stream, listens for Tasks sent as an
 * array of Commands (including subtask functions)
 *
 * stream (if array of event objects)
 *
 */
export const task$ = run$.subscribeTopic(false)
