/**
 * Uses a JSON.stringify "replacer" function to preserve a
 * small (truncated) version of the function signature for
 * Object values that contain them
 */
export const stringify_w_functions = (x, indent) =>
  JSON.stringify(
    x,
    (key, value) => {
      if (typeof value === "function") {
        return (
          value
            .toString()
            .replace(/\r?\n|\r/g, "")
            .replace(/\s\s+/g, " ")
            .slice(0, 12) + "..."
        )
      } else {
        return value
      }
    },
    indent
  )

export const key_index_err = (c, i) => {
  const idx_dict0 = Array.from(Array(19).keys()).reduce(
    (a, idx) => ({ ...a, [idx]: `${idx + 1}th` }),
    {}
  )

  const idx_dict = { ...idx_dict0, 0: "1st", 1: "2nd", 2: "3rd" }
  const idx_str = idx_dict[i]
  return `🔍 it was the ${idx_str} Command in a Task or ${
    idx_dict[i - 1]
  } in a Subtask.`
}

// prettier-ignore
/**
 *
 * `uknown_key_ERR`
 *
 * Just a  little error for people defining commands
 * that makes sure their keys don't contain typos
 */
export const unknown_key_ERR = (str, c, unknown, sub$, index) => `
  🔥 ${ str } ERROR:
  🔥
  🔥 Unrecognized Command Key(s)
  
  FAULTY sub$: "${ sub$ }" 
  ${ Object.keys(unknown)[0] 
  ? `
  ${ index ? key_index_err(c, index) : "" }

  The problematic entry/entries: 

  🤔 ${stringify_w_functions(unknown, 2)}` 
  : "" } 🤔

  ACCEPTABLE ENTRY KEYS: 
  - sub$: topic key for for registering & targeting Commands ${ 
  index ? `  
  - args: payload for the handler of the Command  
  - reso: converts resolved Promise payloads to Command args
  - erro: handles rejected Promise payloads`
  : `
  - args: static payload or payload reshaping function
  - handler: function that is called on payload's arrival
  - source$: source stream (see http://thi.ng/rstream)`
}

  Hope that helps!
  `
