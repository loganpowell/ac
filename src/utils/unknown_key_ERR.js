let fix_jsdoc

/**
 *
 * `uknown_key_ERR`
 *
 * Just a handy little error for people defining commands
 * that makes sure their keys don't contain typos
 */
export const unknown_key_ERR = (str, c, unknown, sub$, i) => {
  const idx_dict0 = Array.from(Array(19).keys()).reduce(
    (a, idx) => ({ ...a, [idx]: `${idx + 1}th` }),
    {}
  )

  const idx_dict = { ...idx_dict0, 0: "1st", 1: "2nd", 2: "3rd" }
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
  🔥 ${str} ERROR:
  🔥
  🔥 Unrecognized Command Key(s)
  
  FAULTY sub$: "${sub$}" ${
    Object.keys(unknown)[0]
      ? `
  ${
    i
      ? `
  🔥 was the ${idx_str} Command in a Task or ${idx_dict[i - 1]} in a Subtask.
        `
      : ""
  }
  The problematic entry/entries: 

  🤔 ${stringify_fns(unknown, 2)}`
      : ""
  } 🤔

  ACCEPTABLE ENTRY KEYS: 
  - sub$: a Topic key for for registering the event 
${
  i
    ? `  - args: arguments for the handler of the event  
  - reso: used for handling resolved Promise args
  - erro: used for handling rejected Promise args`
    : `  - args: payload (static only) of the event  `
}
  - path: path/lens for targeted state evolution

  Hope that helps!
  `
}
