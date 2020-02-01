export const keys_diff = (known_keys = [], known_obj = {}) => {
  let all = Object.keys(known_obj)
  let uknown_keys = all.filter(key => !known_keys.includes(key))
  let uknown_obj = Object.entries(known_obj).reduce((a, [k, v]) => {
    if (!known_keys.includes(k)) return { ...a, [k]: v }
    else return a
  }, {})
  return [uknown_keys, uknown_obj]
}

// keys_diff(["a", "b"], { a: 1, b: 2, c: 3, d: 4 })
// => [ [ 'c', 'd' ], { c: 3, d: 4 } ]
