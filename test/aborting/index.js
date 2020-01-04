// import fetch from "node-fetch"
// import { stream } from "@thi.ng/rstream"
// import { map } from "@thi.ng/transducers"

const fetch = require("node-fetch")
const { stream } = require("@thi.ng/rstream")
const { map } = require("@thi.ng/transducers")
require("abort-controller/polyfill")
/**
 * Blogs:
 * - source1:
 *   https://medium.com/@bramus/cancel-a-javascript-promise-with-abortcontroller-3540cbbda0a9
 * - source2:
 *   https://dev.to/frederikprijck/converting-a-promise-into-an-observable-dag
 */

// Creation of an AbortController signal
const controller = new AbortController()
const signal = controller.signal

const promiseAborter = promise => {
  // window.stop()
  console.log("Promise Started")
  return promise.then(r => {
    if (signal.aborted) {
      return Promise.reject(new Error("Aborted"))
    }

    return new Promise((resolve, reject) => {
      // Something fake async
      resolve(r)

      // Listen for abort event on signal
      signal.addEventListener("abort", () => {
        reject(new Error("Aborted"))
      })
    })
  })
}

promiseAborter(
  fetch("https://api.census.gov/data/2017/cbp/geography.json").then(r =>
    r.json()
  )
)
  .then(r => console.log(r))
  .catch(e =>
    e.message === "Aborted"
      ? console.log("Promise Aborted")
      : console.log("Promise rejected")
  ) //?

// Call a promise, with the signal injected into it
// doSomethingAsync(signal)
//   .then(result => {
//     console.log(result)
//   })
//   .catch(err => {
//     if (err.name === "AbortError") {
//       console.log("Promise Aborted")
//     } else {
//       console.log("Promise Rejected")
//     }
//   })

// // Example Promise, which takes signal into account
// function doSomethingAsync(signal) {
//   if (signal.aborted) {
//     return Promise.reject(new DOMException("Aborted", "AbortError"))
//   }

//   return new Promise((resolve, reject) => {
//     console.log("Promise Started")

//     // Something fake async
//     const timeout = window.setTimeout(resolve, 3000, "Promise Resolved")

//     // Listen for abort event on signal
//     signal.addEventListener("abort", () => {
//       window.clearTimeout(timeout)
//       reject(new DOMException("Aborted", "AbortError"))
//     })
//   })
// }

const abort$ = stream().subscribe(map(() => controller.abort()))

// Browser
document.getElementById("stop").addEventListener("click", e => {
  e.preventDefault()
  // controller.abort()
  abort$.next("abort")
})

// NODE:
// setTimeout(() => abort$.next("abort"), 50)

// setTimeout(() => controller.abort(), 5)
