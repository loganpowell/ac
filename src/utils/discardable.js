import { stream } from "@thi.ng/rstream"
import { loading } from "../DOM"
import { cancel$ } from "../streams"
import { Atom } from "@thi.ng/atom"
import { map } from "@thi.ng/transducers"
import "abort-controller/polyfill"
/**
 * Blogs:
 * - source1:
 *   https://medium.com/@bramus/cancel-a-javascript-promise-with-abortcontroller-3540cbbda0a9
 * - source2:
 *   https://dev.to/frederikprijck/converting-a-promise-into-an-observable-dag
 */

// Creation of an AbortController signal

/**
 *
 * ## `discardable`
 *
 * Promise handler that is attached to an existing Promise
 * and adds the ability to discard a pending result
 * (original Promise isn't Discarded)
 *
 */

export const discardable = promise =>
  promise.then(r => {
    return new Promise((resolve, reject) => {
      // Something fake async

      // Listen for abort event on signal
      cancel$.deref() === true ? reject("promise rejected") : null

      resolve(r)
    })
  })
