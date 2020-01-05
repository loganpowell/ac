const { cancel$ } = require("../../src/streams")
const fetch = require("node-fetch")
const { stream } = require("@thi.ng/rstream")
const { map } = require("@thi.ng/transducers")
require("abort-controller/polyfill")

const controller = new AbortController()
const signal = controller.signal

// working

const abortable = promise => {
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

abortable(
  fetch("https://api.census.gov/data/2017/cbp/geography.json").then(r =>
    r.json()
  )
)
  .then(r => console.log(r))
  .catch(e =>
    e.message === "Aborted"
      ? console.log("Promise Aborted")
      : console.log("Promise rejected")
  )

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

/* Also works... sorta... */

// export const discardable = promise =>
//   promise.then(r => {
//     return new Promise((resolve, reject) => {
//       // Something fake async

//       // Listen for abort event on signal
//       cancel$.deref() === true ? reject("promise rejected") : null

//       resolve(r)
//     })
//   })
