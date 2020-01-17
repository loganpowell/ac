import { theme_styler } from "../theme"

const x_btn_bhvr = name => ({
  onclick: () => console.warn(`no handler assigned to ${name} 'onclick' event`)
})

// a HOF that takes a config and returns an HDOM node function
export const button_x = (cfg, theme_path) => {
  cfg = { tag: "a", tag_noop: "span", ...cfg }

  // allow user-defined spec-compliant overrides (e.g., tagActive for route link)
  const hash = theme_styler(
    "button",
    {
      fontSize: [2, 3, 4],
      my: [1, 2, 3],
      marginRight: [1, 2, 3]
    },
    theme_path
  )
  // the returned hdom node fn with user-provided arbitrary context object
  return (ctx, attrs, ...children) =>
    attrs && attrs.disabled
      ? [
          cfg.tag_noop,
          {
            class: hash,
            style: {
              "background-color": ctx.theme.colors.muted || "gray",
              cursor: "default"
            },
            ...attrs
          },
          ...children
        ] // inline theme-derived overrides
      : typeof attrs !== "object"
      ? [cfg.tag, { class: hash, ...x_btn_bhvr(hash) }, attrs, ...children]
      : [cfg.tag, { class: hash, ...x_btn_bhvr(hash), ...attrs }, ...children]
}

export const button = button_x(null, "buttons.simple") // also accepts ["buttons", "simple"]
