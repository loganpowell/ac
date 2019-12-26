import {
  isObject,
  isArray,
  isFunction,
  isPromise,
  isString,
  isNull,
  isBoolean
} from "@thi.ng/checks"

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
  if (isArray(x))                       return "ARRAY"
  if (isFunction(x) && x.length === 0)  return "THUNK"
  if (isFunction(x) && x.length > 0)    return "FUNCTION"
  if (isPromise(x))                     return "PROMISE"
  if (isString(x))                      return "STRING"
  if (isBoolean(x))                     return "BOOLEAN"
  if (isNull(x))                        return "NULL"
  if (isObject(x))                      return "OBJECT"
                                        return "type_str NOT FOUND"
}
