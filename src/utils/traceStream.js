import { trace } from "@thi.ng/rstream"

let fix_jsdoc

/**
 * ## `trace_stream`
 *
 * simple ad-hoc tracer to log one of the streams emmissions
 * @param {string} log_prefix A string that is prepended to
 *                  console.log's of emissions from the
 *                  stream
 * @param {stream}
 * */
export const trace$ = (log_prefix, stream) =>
  stream.subscribeTopic
    ? stream.subscribeTopic("_TRACE_STREAM", {
        next: x => console.log(log_prefix, x),
        error: console.warn
      })
    : stream.subscribe(trace(log_prefix))
