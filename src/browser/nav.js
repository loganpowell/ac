import {
  fromDOMEvent,
  merge,
  stream,
  sidechainPartition
} from "@thi.ng/rstream"

export const popstate$ = fromDOMEvent(window, "popstate", "popstate-stream")

export const DOMContentLoaded$ = fromDOMEvent(
  window,
  "DOMContentLoaded",
  "load-stream"
)

// these are the only ones I need for input...
export const navigated$ = merge({ src: [popstate$, DOMContentLoaded$] })

export const route$ = stream()

// this can be replaced by a task
export const sidechainNav$ = navigated$.subscribe(sidechainPartition(route$))
