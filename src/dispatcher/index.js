/**
 @module Task_Spooler
*/
import { isFunction, isPromise } from "@thi.ng/checks"
import { map } from "@thi.ng/transducers"
import { stringify_type, unknown_key_ERR } from "../utils"
import { command$, task$ } from "../streams"

let fix_jsdoc

/**
 *
 * ## `dispatcher`
 *
 * ### TL;DR:
 *
 * Handles Collections (array) of Commands ("Tasks") which
 * require _ordered_ choreography and/or have a dependency
 * on some (a)sync data produced by a user interaction.
 *
 * ### Synopsis:
 *
 * - Async `reduce` function, that passes an accumulator
 *   (`acc`) as a local state container between Command
 *   invocations.
 * - Commands are composed in-situ in userland (Ad hoc)
 * - spools a collection of Commands as a Task
 * - resolves any promises contained within a Command
 * - passes an accumulator (acc) to subsequent Commands in a
 *   Task
 *
 * ### Type checks on function signatures
 *
 * There are two valid forms for Task entries:
 * 1. a Unary function returning an array of Commands:
 *    referred to as "Subtasks"
 * 2. A Command object: dispatch to registered handlers
 *
 * ## Recognized Keys
 *
 * There are 5 recognized keys for a Command object:
 *
 * ### Primary keys
 *
 * ##### `sub$` key
 *
 * - Topic identifier: used for registering handlers hooked
 *    onto the Command stream.
 *
 * ##### `args` key
 *
 * - __primary control structure__ with three recognized
 *   forms that do different things in the context of a
 *   Task:
 * - non-function `args` (primitives, objects) send the args
 *   as-is to the Command handler
 * - nullary fns (`(0)=>` ) send the _args_ as a Command to
 *   a `sub$` _stream_ of your choosing (ADVANCED: see
 *   Ad-hoc Stream Injection below)
 * - unary fns (`(1)=>`) are passed the inter-Task
 *   accumulated value, called and the resulting value is
 *   passed to registered Command handler
 * - Promises (and those returned from `(1)=>`) are resolved
 *   and their values sent to the handler
 * - new vals (Objects) are merged with accumulated object
 *   from preceding Task results(dupe keys overwritten)
 *
 * ### Promise-specific keys -> binary (as in two parameter,
 *   not boolean) functions:
 *
 * ##### `reso` key
 *
 * - (resolving) function `(2)=>` = handle resolved
 *   promises: MUST be a binary fn `(acc, resolved Promise)
 *   =>`
 *
 * ##### `erro` key
 *
 * - `(2)=>` = handle rejected promises: MUST be
 *   a binary fn `(acc, Promise rejection) =>`
 *
 * ### State evolution-specific key:
 *
 * ##### `path` key
 *
 * - this is intended to provide a cursor into the global
 *   state [Atom](http://thi.ng/atom) for global state
 *   evolution (immutably of course)
 * - However, you can do anything you want with it using any
 *   other `sub$` key than `"STATE"`. It's allowed to be any
 *   form of static data (no functions), but its presence
 *   sets dispatcher to trigger a Command.
 *
 * ### Subtasks:
 *
 * Subtasks are the way you compose tasks. Insert a Task and
 * the dispatcher will unpack it in place (super -> sub
 * order preserved) A Subtask must be defined as a unary
 * function that accepts an accumulator object and returns a
 * Task, e.g.:
 *
 * #### PSEUDO
 * ```js
 * // { C: Command }
 * // ( { A: Accumulator }: Object ) => [{C},{C}]: Subtask
 * let someSubtask = ({A}) => [{C}, {C}, ({A})=>[{C},{C}], ...]
 * ```
 *
 * #### Example
 * ```js
 * // subtask example:
 * let subtask1 = acc => [
 *  { sub$: "acc"
 *  , path: ["body"]
 *  , args: { data: acc.data } },
 *  { sub$: "route"
 *  , args: { route: { href: acc.href } } }
 * ]
 *
 * // task
 * let task = [
 *  { args: { href: "https://my.io/todos" } }, // acc init
 *  { sub$: "fetch"
 *  , args: ({ href }) => fetch(href).then(r => r.json())
 *  , erro: (acc, err) => ({ sub$: "cancel", args: err })
 *  , reso: (acc, res) => ({ data: res }) },
 *  acc => subtask1(acc), // subtask reference
 *  { sub$: "FLIP" , args: "done" }
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
 * separate stream of your own creation during a Task by
 * using a nullary ("thunk") `(0)=>` function signature as
 * the `args` value of a Command. If this is the case, the
 * dispatcher assumes the `sub$` key references a stream and
 * sends the return value of the thunk to that stream
 *
 * > Note: if you need to pass the accumulator to your
 * thunk, put it in a subtask, where you can
 * access/destructure the data from the acc passed into the
 * subtask function
 *
 * ```js
 * import { stream, trace } from "@thi.ng/rstream"
 *
 * // ad-hoc stream
 * let login = stream().subscribe(trace("login ->"))
 *
 * // task
 * let task = [
 *  { args: { href: "https://my.io/auth" } }, // <- no sub$, just pass data
 *  { sub$: login , args: () => "logging in..." },
 *  { sub$: "AUTH"
 *  , args: ({ href }) => fetch(href).then(r => r.json())
 *  , erro: (acc, err) => ({ sub$: "cancel", args: err })
 *  , reso: (acc, res) => ({ token: res }) },
 *  acc => subtask_login(acc),
 *  { sub$: login , args: () => "log in success" }
 * ]
 *
 * // subtask
 * let subtask_login = ({ token }) => [
 *  { sub$: login // <- stream
 *  , args: () => ({ token }) } // <- use acc
 * ]
 * ```
 *
 **/
export const dispatcher = task_array =>
  task_array.reduce(async (a, c, i) => {
    const acc = await a
    // console.log("ACCUMULATOR =>", acc)
    if (isFunction(c)) {
      let recur = c(acc)
      // this ensures the accumulator is preserved between
      // stacks
      recur.unshift({ args: acc })
      return dispatcher(recur)
    }
    const { sub$, args, path, reso, erro, ...unknown } = c
    if (Object.keys(unknown).length > 0)
      throw new Error(unknown_key_ERR("Task Dispatcher", c, unknown, sub$, i))
    let arg_type = stringify_type(args)
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
      // if thunk, dispatch to ad-hoc stream, return acc as-is
      result = args()
      console.log("dispatching to custom stream")
      sub$.next(result) // 💃
      return acc
    }
    if (arg_type === "FUNCTION") {
      // if function, call it with acc and resolve any promises
      let temp = args(acc)
      result = isPromise(temp) ? await temp.catch(e => e) : temp
    }
    if (arg_type === "OBJECT") {
      // if object, send the Command as-is and spread into acc
      command$.next(c)
      return { ...acc, ...args }
    }
    // https://stackoverflow.com/a/31538091
    if (args !== Object(args)) {
      // if primitive, send the Command as-is, return acc as-is
      command$.next(c)
      return acc
    }

    // RESULT HANDLERS
    // acc handler
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
      else result = resolved
    }
    // error, but no error handler
    if (result instanceof Error) {
      console.warn("error in reducer:", result)
      throw new Error(result)
    }
    // if the result has made it this far, send it along
    // console.log(`${sub$} made it through`)
    command$.next({ sub$, args: result })
    return { ...acc, ...result }
  }, Promise.resolve({}))

/**
 * ## Dispatch registration
 *
 * Attaches the dispatcher to the task$ stream
 *
 */
// task$.transform(map(todos => dispatcher(todos)))
