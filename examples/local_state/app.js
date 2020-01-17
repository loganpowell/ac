/*
NOTES:
- source:
  https://github.com/thi-ng/umbrella/blob/develop/examples/hdom-local-render/src/index.ts
- demo: https://demo.thi.ng/umbrella/hdom-local-render/
- docs on lifecycle:
  https://github.com/thi-ng/umbrella/tree/master/packages/hdom#component-objects-with-life-cycle-methods
- docs on state MGMT/HOF components:
  https://github.com/thi-ng/umbrella/wiki/Higher-order-components
  
*/

import { DEFAULT_IMPL, normalizeTree, replaceChild } from "@thi.ng/hdom"
import { memoize1 } from "@thi.ng/memoize"
import { fromInterval, sync } from "@thi.ng/rstream"
import { cycle, map } from "@thi.ng/transducers"
import { updateDOM } from "@thi.ng/transducers-hdom" //

//
//  888                          888
//  888  e88~-_    /~~~8e   e88~\888  e88~~8e  888-~\  d88~\
//  888 d888   i       88b d888  888 d888  88b 888    C888
//  888 8888   |  e88~-888 8888  888 8888__888 888     Y88b
//  888 Y888   ' C888  888 Y888  888 Y888    , 888      888D
//  888  "88_-~   "88_-888  "88_/888  "88___/  888    \_88P
//
//
/**
 *
 * Three-part components:
 * 1. animation input(s) <- from load$ `pubsub` stream
 *    component registers (`stream.deref()`)
 * 2. output -> sends fetch/axios Command/Task (`run$.next()`)
 * 3. Command/Task handler to put them together
 *
 * This component-type listens to the progress of
 * up/download events the listener is disposed of on
 * `release`
 *
 *
 */

/*/// js

var w = 0;
setInterval(function() {
  w = w % 100 + 10;

  $('#animate').width(w + '%').text(w + '%')
}, 1000);

*/

/* css
.progress-bar-purple {
  background-color: purple !important;
  font-size: 24px !important;
  line-height: 240px !important;
  font-family: "Times New Roman"
}
.progress.tall {
  min-height: 240px;
  max-width: 240px;
  background-color: blue;
}
.progress-bar-orange {
  background-color: orange !important;
}
*/

// infinite cyclic sequence of colors const COLORS =
cycle(["dark-red", "black", "dark-pink", "dark-blue"])
/**
 * Abstract base class for components with local state which
 * can re-render themselves on demand, without requiring a
 * full DOM update.
 */
const LocalReRenderable = {
  /**
   * Init lifecycle method. In the base case, this is only
   * used to cache this component's actual root DOM element.
   *
   * @param el
   */
  el: null,
  init(el) {
    this.el = el
  },
  /**
   * Call this function with any args usually given to your
   * component when a re-render of this component's sub-tree
   * is required. The component should set the `__diff` hdom
   * behavior control attribute of the root element to
   * false, to avoid potential clashes with future diffs
   * during a full DOM update.
   *
   * @param args - component args
   */
  localRender(...args) {
    const el = this.el
    const children = el.parentElement.children
    for (let i = children.length; --i >= 0; ) {
      if (children[i] === el) {
        replaceChild(
          {},
          DEFAULT_IMPL,
          this.el.parentElement,
          i,
          normalizeTree({}, [this, ...args]),
          true
        )
        return
      }
    }
  }
}

// Dummy test component with local on-demand re-render

const Foo = id => ({
  ...LocalReRenderable,
  id,
  col: COLORS.next().value,
  render(ctx, time) {
    this.time = time
    return [
      `div.dib.w4.br2.pa2.mr2.tc.nosel.bg-${this.col}`,
      {
        // important (see comment further above)
        __diff: false,
        // pick new color and immediately re-render this
        // component's subtree
        onclick: () => {
          this.col = COLORS.next().value
          this.localRender(this.time)
        }
      },
      `${this.id}: ${time}`
    ]
  }
})

// Memoized component factory. This is needed to preserve
// local state and avoid the infectious behavior of HOF
// component initialization propagating up the component
// tree... Also see other versions of `memoize` available
// (http://thi.ng/memoize) In general, only pass component
// unique base config or IDs to the memoized function,
// **NOT** any dynamically changing state (e.g. not the
// `time` state value below). Such state can still be passed
// to the memoized component via `[component, ...arg]`.
// However, the args given to the factory are only used as
// cache key to find an already memoized component...
const foo = memoize1(id => Foo(id))
const app = ({ time }) => [
  "div",
  {},
  // use memoized components (lazy invocation): the
  // `foo(id)` calls merely return the memoized component
  // (or, in the first frame, actually create the
  // components, and which are then cached, i.e.
  // memoized...)
  [foo("a"), time],
  [foo("b"), time],
  [foo("c"), time]
]
// trigger full DOM updates every 2 secs
sync({ src: { time: fromInterval(2000) } }).transform(
  map(app),
  updateDOM({ root: document.getElementById("app") })
)
