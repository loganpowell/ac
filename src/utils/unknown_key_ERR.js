/**
 * Uses a JSON.stringify "replacer" function to preserve a
 * small (truncated) version of the function signature for
 * Object values that contain them
 */
let stringify_w_functions = (x, indent) =>
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

// prettier-ignore
/**
 *
 * `uknown_key_ERR`
 *
 * Just a  little error for people defining commands
 * that makes sure their keys don't contain typos
 */
export const unknown_key_ERR = (str, c, unknown, sub$, index) => {
  const idx_dict0 = Array.from(Array(19).keys()).reduce(
    (a, idx) => ({ ...a, [idx]: `${idx + 1}th` }),
    {}
  )

  const idx_dict = { ...idx_dict0, 0: "1st", 1: "2nd", 2: "3rd" }
  const idx_str = idx_dict[index]


  return `
  🔥 ${ str } ERROR:
  🔥
  🔥 Unrecognized Command Key(s)
  
  FAULTY sub$: "${ sub$ }" 
  ${ Object.keys(unknown)[0] 
  ? ` ${ index 
    ? `
  🔥 was the ${idx_str} Command in a Task or ${ idx_dict[index - 1] } in a Subtask.
  ` : "" }
  The problematic entry/entries: 

  🤔 ${stringify_w_functions(unknown, 2)}` 
  : "" } 🤔

  ACCEPTABLE ENTRY KEYS: 
  - sub$: a Topic key for for registering the event ${ 
  index 
  ? `  
  - args: arguments for the handler of the event  
  - reso: handler for resolved Promise args
  - erro: handler for rejected Promise args`
  : `
  - args: payload or payload reshape function 
  - handler: function that is called on payload's arrival
  - source$: source stream (advanced use only)`
}
  - path: path/lens for targeted state evolution

  Hope that helps!
  `
}
