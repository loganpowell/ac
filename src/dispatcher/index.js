/**
 @module Dispatcher
*/
import { isFunction, isPromise } from "@thi.ng/checks"
import { map } from "@thi.ng/transducers"
import { type_str } from "../utils"
import { command$, run$ } from "../streams"

const unknown_key = (c, i, unknown) => {
  const idx_dict0 = Array.from(Array(19).keys()).reduce(
    (a, idx) => ({ ...a, [idx]: `_${idx + 1}th_` }),
    {}
  )

  const idx_dict = { ...idx_dict0, 0: "First", 1: "Second", 2: "Third" }
  const idx_str = idx_dict[i]
  const UFO = JSON.stringify(unknown)
  return `
  🔥 Found an unrecognized Command key...${
    Object.keys(unknown)[0]
      ? `
  🔥 It was the _${idx_str}_ member of a Task or Subtask.
  🔥 The entry -< ${UFO.substring(1, UFO.length - 1)}`
      : ""
  } >- was found with:
  🤔 ${JSON.stringify(c, null, 2)} 🤔

  The acceptable are: 
  - sub$: String
  - args: Any
  - path?: Array | String
  - reso?: Function
  - erro?: Function
  
  Hope that helps!

  PS: I can't see entries w/function values.
  `
}

/**
 * @description
 * ## `dispatcher`
 *
 * Async `reduce` function, that passes an _object_ as a
 * state container between Command invocations.
 *
 * ### TL;DR:
 *
 * Handles any state updates and/or other effects which
 * require _ordered_ choreography and/or have a dependency
 * on some (a/sync) data produced by a user interaction.
 *
 * ### Synopsis:
 *
 * - very simple async finite state machine.
 * - Commands are composed in-situ in userland (Ad hoc)
 * - spools a collection of Commands as a Task
 * - resolves any promises contained within a Command
 * - passes an accumulator (STATE) to subsequent Commands in
 *   a Task
 *
 * ### Type checks on function signatures
 *
 * There are two valid forms for Task entries:
 * 1. a Unary function: alias/refer to sub Tasks
 * 2. A Command object: dispatch to Command stream
 *
 * ## Recognized Keys
 *
 * There are 5 recognized keys for a Command object:
 *
 * > Required keys
 * 1. `sub$` key = primary identifier
 * - used for registering handlers hooked onto the Command
 *   stream.
 *
 * 2. `args` key = __primary control structure__
 *  - non-function vals send the Command as-is
 *  - `(0)=>` nullary fns send the _args_ as a Command to
 *    the `sub$` stream of your choosing (see Ad-hoc Stream
 *    Injection below)
 *  - `(1)=>` unary fns are passed the STATE and called
 *  - Promises (and those returned from `(1)=>`) are
 *    resolved
 *  - new vals are merged with STATE (dupe keys overwritten)
 *
 * > Promise-specific keys -> binary (as in two parameter,
 *   not boolean) functions:
 *
 * 3. `reso` key = handle resolved promises: `(2)=>` MUST be
 *    a binary fn `(STATE, resolved Promise) =>`
 *
 * 4. `erro` key = handle rejected promises : `(2)=>` MUST
 *    be a binary fn `(STATE, Promise rejection) =>`
 *
 * > State-specific key:
 * 5. `path` key = lens
 * - this is used to cursor into the global state
 *   [Atom](http://thi.ng/atom) for global state evolution
 *   (immutably of course)
 * - you can do anything you want with it. It's allowed to
 *   be any form of static data (no functions), but its
 *   presence sets dispatcher to trigger a Command.
 *
 * ### Subtasks:
 * Subtasks are the way you compose tasks. Insert a Task and
 * the dispatcher will unpack it in place (super -> sub
 * order preserved) A Subtask must be defined as a unary
 * function that accepts a state object and returns a Task,
 * e.g.:
 *
 * #### PSEUDO
 * ```js
 * // { C: Command }
 * // ( S: STATE ) => [...]: Subtask
 * let someSubtask = state => [{C}, {C}, (S)=>[...], ...]
 * ```
 *
 * #### Example
 * ```js
 * // subtask example:
 * let subtask1 = state => [
 *  { args: state }, // no sub$ key = state continuation 👀
 *  { sub$: "state"
 *  , path: ["body"]
 *  , args: { data: state.data } },
 *  { sub$: "route"
 *  , args: { route: { href: state.href } } }
 * ]
 *
 * // task
 * let task = [
 *  { args: { href: "https://my.io/todos" } }, // state init
 *  { sub$: "fetch"
 *  , args: ({href}) => fetch(href).then(r => r.json())
 *  , erro: (state, err) => ({ sub$: "cancel", args: err })
 *  , reso: (state, res) => ({ data: res }) },
 *  state => subtask1(state), // subtask reference
 *  { sub$: "FLIP"
 *  , args: "done" }
 * ]
 *
 * ```
 *
 * #### Use:
 * ```js
 * import { run$ } from "hurl"
 *
 * export const run = e => run$.next(e);
 *
 * //... 📌 TODO...
 * ```
 *
 * ### Ad-hoc stream injection
 *
 * ADVANCED USE ONLY 👽
 *
 * HURL tries to hide the stream implentation from the user
 * as much as possible, but allows you to go further down
 * the rabbit hole if so desired. You may send Commands to a
 * separate stream of your own creation by using a unary
 * `(0)=>` function signature as your `args` value If this
 * is the case, the dispatcher assumes the `sub$` key
 * references a stream and sends the return value of the
 * thunk to that stream
 *
 * > Note: if you need to pass in state/data to your thunk,
 * put it in a subtask, where you can access/destructure the
 * data from the state passed into the subtask function
 *
 * ```js
 * import { stream, trace } from "@thi.ng/rstream"
 *
 * // ad-hoc stream
 * let login = stream().subscribe(trace("login ->"))
 *
 * // subtask
 * let subtask_login = state => [
 *  { args: state },
 *  { sub$: login // <- stream
 *  , args: { data: state.token } } // <- use state
 * ]
 *
 * // task
 * let task = [
 *  { sub$: login
 *  , args: () => "logging in..." },
 *  { sub$: "init"
 *  , args: { href: "https://my.io/auth" } },
 *  { sub$: "cookie"
 *  , args: ({href}) => fetch(href).then(r => r.json())
 *  , erro: (state, err) => ({ sub$: "cancel", args: err })
 *  , reso: (state, res) => ({ token: res }) },
 *  state => subtask_login(state),
 *  { sub$: login
 *  , args: () => "log in success" }
 * ]
 * ```
 *
 **/
export const dispatcher = task_array =>
  task_array.reduce(async (a, c, i) => {
    const acc = await a
    // console.log("ACCUMULATOR =>", acc)
    if (isFunction(c)) {
      let recur = c(acc) //?
      return dispatcher(recur)
    }
    const { sub$, args, path, reso, erro, ...unknown } = c //🤔 (sub$ = "")
    if (Object.keys(unknown).length > 0)
      throw new Error(unknown_key(c, i, unknown))
    let arg_type = type_str(args)
    let result = args

    /**
     * ### Caveats:
     *
     * - It's _highly_ recommended to go through the
     *   provided event handling system rather than monkey
     *   patching in your own streams in the above fashion,
     *   however it may be useful in some cases (e.g., for
     *   injecting a quick in-situ logger within a task as
     *   opposed to tracing all command emmissions with
     *   `trace_stream`)
     *
     * - The dispatcher preserves execution order of
     *   Commands within a Task, but doesn't do anything to
     *   prevent Commands sent directly to the Command
     *   stream - while the Task is spooling - from being
     *   executed during the execution of the Commands in
     *   the Task queue. This can actually be useful
     *   behavior if you want to enable an, e.g.,
     *   side-effect canceling handler (e.g.,
     *   [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController),
     *   [📌
     *   tut](https://www.youtube.com/watch?v=P_mSaky4OtA))
     *
     *
     * ARG SIGNATURE LOGIC
     *
     */
    if (arg_type === "THUNK") {
      result = args()
      sub$.next(result) // 💃
      // if thunk, dispatch to ad-hoc stream, return acc as-is
      return acc
    }
    if (arg_type === "STRING" || arg_type === "BOOLEAN") {
      // if string, send the Command as-is, return acc as-is
      command$.next(c)
      return acc
    }
    if (arg_type === "FUNCTION") {
      let temp = args(acc)
      // if function, call it with acc and resolve any promises
      result = isPromise(temp) ? await temp.catch(e => e) : temp
    }
    if (arg_type === "OBJECT") {
      command$.next(c)
      // if object, send the Command as-is and spread into acc
      return { ...acc, ...args }
    }

    // RESULT HANDLERS
    // state handler
    if (path && !(result instanceof Error)) {
      command$.next({ sub$, path, args: result })
      return { ...acc, ...result }
    }
    // promise rejection handler
    if (erro && result instanceof Error) {
      let error = erro(acc, result)
      console.warn("error in Promise within dispatcher:", result)
      if (error.sub$) return command$.next(error)
      throw new Error(error)
    }
    // no sub$ key & not a promise -> just spread into acc
    if (!reso && !sub$) return { ...acc, ...result }
    // resovled promise handler
    if (reso && !(result instanceof Error)) {
      let resolved = reso(acc, result)
      if (resolved.sub$) command$.next(resolved)
      // resolved promise with no sub$ key -> spread
      // resolved value into acc
      else if (!sub$) return { ...acc, ...resolved }
      else command$.next({ sub$, args: resolved })
      return { ...acc, ...resolved }
    }
    // error, but no error handler
    if (result instanceof Error) {
      console.warn("error in reducer:", result)
      throw new Error(result)
    }
    // if the result has made it this far, send it along
    command$.next({ sub$, args: result })
    return { ...acc, ...result }
  }, Promise.resolve({}))

/**
 * ## `task$`
 *
 * Batch processing stream, listens for Tasks sent as an
 * array of Commands (including subtask functions)
 *
 * stream (if array of event objects)
 *
 */
export const task$ = run$
  .subscribeTopic(false)
  .transform(map(todos => dispatcher(todos)))
