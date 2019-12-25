import { command$, task$ } from "../streams"
import { map, comp } from "@thi.ng/transducers"

/**
 *
 * ## `registerStream$`
 *
 * Provides a way to register ad-hoc upstream producers into
 * the command$ stream
 *
 * registers injection stream w/either command$ or task$
 * stream
 *
 * @param {Stream} stream$ the upstream producer
 * @param {Task | Command} task_or_command Command or Task
 * to dispatch on event
 * @param {function} xform optional transducer to preprocess
 * streamed vals before dispatching Command or Task
 * downstream
 */
export const registerStream$ = (stream$, task_or_command, xform) => {
  let xf = $ =>
    xform
      ? comp(
          xform,
          map(x => $.next(x))
        )
      : map(x => $.next(x))
  // looks for the `sub$` key to determine if its a command
  return task_or_command.sub$
    ? stream$.subscribe(xf(command$))
    : stream$.subscribe(xf(task$))
}
