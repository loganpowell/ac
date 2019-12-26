export const unknown_key_ERR = (c, unknown, sub$, i) => {
  const idx_dict0 = Array.from(Array(19).keys()).reduce(
    (a, idx) => ({ ...a, [idx]: `_${idx + 1}th_` }),
    {}
  )

  const idx_dict = { ...idx_dict0, 0: "First", 1: "Second", 2: "Third" }
  const idx_str = idx_dict[i]

  let stringify_fns = (x, indent) =>
    JSON.stringify(
      x,
      (key, value) => {
        if (typeof value === "function") {
          return (
            value
              .toString()
              .replace(/\r?\n|\r/g, "")
              .slice(0, 12) + "..."
          )
        } else {
          return value
        }
      },
      indent
    )
  return `
  🔥 Unrecognized Command Key(s)
  
  FALTY sub$: "${sub$}" ${
    Object.keys(unknown)[0]
      ? `
  ${
    i
      ? `🔥 It was the _${idx_str}_ member of a Task or _${
          idx_dict[i - 1]
        }_ of a Subtask.`
      : ""
  }
  The problematic entry/entries: 

  🤔 ${stringify_fns(unknown, 2)}`
      : ""
  } 🤔

  ACCEPTABLE KEYS: 
  * sub$: a Topic key for for registering the event 
  * args: arguments for the handler of the event
${
  i
    ? `  ? reso: used for handling resolved Promise args
  ? erro: used for handling rejected Promise args`
    : `  * handler: function for side effecting code`
}
  ? path: an optional path/lens for targeted state evolution
  
  ( * = required, ? = optional )

  Hope that helps!
  `
}
