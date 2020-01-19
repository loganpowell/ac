import axios from "axios"
import fetch from "node-fetch"
// import "whatwg-fetch"

const make_progress = (numer, denom, preci = 0.01) =>
  ~~((numer / denom) * 100) * preci

// make_progress(1230, 2312) //?

const log = console.log

//
//  888                        ,e,
//  888-~88e    /~~~8e   d88~\  "   e88~~\  d88~\
//  888  888b       88b C888   888 d888    C888
//  888  8888  e88~-888  Y88b  888 8888     Y88b
//  888  888P C888  888   888D 888 Y888      888D
//  888-_88"   "88_-888 \_88P  888  "88__/ \_88P
//
//

let baseURL = "http://jsonplaceholder.typicode.com/posts/4"

// THEN'ing:
axios.get(baseURL).then(r => r.data)
/*
{ 
  userId: 1,
  id: 4,
  title: 'eum et est occaecati',
  body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit' 
}
*/

// INSTANCE'ing
let instance = axios.create({
  baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
})

instance.get()
/*
result:
{
  data: {}
  status: #,
  headers: {}, <- response headers
  config: {
    method: 'get',
    headers: {}, <- request headers
    basURL: "http://jsonplaceholder.typicode.com/posts/4",
    transformRequest: [[λ]],
    transformResponse: [[λ]],
    timeout: 1000,
    adapter: [λ: xhrAdapter],
    xsrfCookieName: 'XSRF-TOKEN',
    ...
  },
  request: XMLHttpRequest {
    upload: XMLHttpRequestUpload {},
    _registeredHandlers: Set { 'readystatechange' },
    _eventHandlers: { readystatechange: [λ: handleLoad] },
    [Symbol(impl)]: XMLHttpRequestEventTargetImpl {},
    [Symbol(flag)]: {},
    [Symbol(properties)]: {},
  }
}

Also supports:
- request(cfg)
- get(url, config)
- delete(url, config)
- head(url, config)
- options(url, config)
- post(url, data, config)
- put(url, data, conifg)
- patch(url, data, config)
- getUri(config)

*/

// REQUEST CONFIG

/**
 * onDownloadProgress only works in the browser indeed. That
 * should be noticed in the documentation.
 *
 * In this case you're using responseType: stream so you can
 * implement the download progress by looking at the
 * Content-Length response header and the dataevents in the
 * stream you get in the response.
 *
 * https://javascript.info/fetch-progress
 *
 * https://serviceworke.rs/push-get-payload_index_doc.html
 *
 * https://jakearchibald.com/2016/streams-ftw/
 *
 *https://javascript.info/fetch-progress
 */
let censusURL =
  "https://api.census.gov/data/2018/acs/acs1?get=B00001_001E&for=county:*"
let progression = ev => log({ loaded: ev.loaded, total: ev.total })

let progressInst = axios.create({
  baseURL: censusURL,
  onDownloadProgress: progression,
  onUPloadProgress: progression
})

// progressInst.get() //?

//

fetch("https://api.census.gov/data/2018/acs/acs1?get=B00001_001E&for=county:*")
  .then(function(response) {
    // 🔥 .getReader() only works in browser
    let reader = response.body.getReader()
    let bytesReceived = 0

    let total = response.headers.get("Content-Length")
    // recursion
    reader.read().then(function process({ done, value }) {
      if (done) {
        console.log("Fetch complete")
        return
      }
      bytesReceived += value.length
      console.log(`Received ${bytesReceived} bytes of ${total} data so far`)

      return reader.read().then(process)
    })
  })
  .then(x => x) //?

/**
 *
 * Three-part components:
 * 1. animation input(s) <- from load$ `pubsub` stream
 *    component registers (`stream.deref()`)
 * 2. output -> sends fetch/axios Command/Task
 *    (`run$.next()`)
 * 3. Command/Task handler to put them together
 *
 * This component-type listens to the progress of
 * up/download events the listener is disposed of on
 * `release`
 *
 *
 * ad-hoc implementation?
 *
 * currently, the router task assumes a generic promise is
 * being handled. Considerations:
 * 1. can a progress handler be injected before/after
 *    generic promise Command as a `pre`&/`post` Task?
 *    - I don't think so: promise is resolved in `spool`er
 * 2. if not, how might we alter the promise-handling
 *    functionality within `spool` to check for `axios`
 *    methods and dispatch progress to a `pubsub` therein?
 *
 *
 */
