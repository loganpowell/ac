import { DEFAULT_IMPL, normalizeTree, replaceChild } from "@thi.ng/hdom"
// import { memoize1 } from "@thi.ng/memoize"

export const insulated = {
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
  isorender(...args) {
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

/*
const Foo = id => ({
  ...insulated,
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
          this.isorender(this.time)
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

*/
