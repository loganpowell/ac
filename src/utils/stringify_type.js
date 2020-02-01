import { isObject, isFunction, isPromise } from "@thi.ng/checks"

let fix_jsdoc

// prettier-ignore
/**
 * ### `stringify_type`
 *
 * just a little convenience function
 * takes some value and returns a string representation of its type
 * this makes it easier to create a switch statement using types
 *
 * powered by [@thi.ng/checks](http://thi.ng/checks)
 *
 */
export const stringify_type = x => {
  if (isFunction(x) && x.length === 0)  return "THUNK"
  if (isFunction(x) && x.length > 0)    return "FUNCTION"
  if (isPromise(x))                     return "PROMISE"
  if (isObject(x))                      return "OBJECT"
                                        return "type_str NOT FOUND"
}
