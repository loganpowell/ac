import { trace } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"

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
export const traceStream = (log_prefix, stream) =>
  stream.subscribeTopic
    ? stream.subscribeTopic("...JUST_L0GGING...", {
        next: x => console.log(log_prefix, x),
        error: console.warn
      })
    : stream.subscribe(trace(log_prefix))
