import { EquivMap } from "@thi.ng/associative"
import { hurl_router } from "../../src"

const getSomeJSON = async (query, path, b) => {
  const base = "https://jsonplaceholder.typicode.com/"
  const data = b
    ? await fetch(`${base}${path}/${b}`).then(r => r.json())
    : await fetch(`${base}${path}/`).then(r => r.json())
  return data
}
const routes = async state => {
  let {
    subdomain, // array
    domain, // array
    path: [p_a, p_b], // array
    query, // object
    hash // string
  } = state

  return (
    (await new EquivMap([
      [{ ...state, path: ["todos"] }, getSomeJSON(query, "todos")],
      [{ ...state, path: ["todos", p_b] }, getSomeJSON(query, "todos", p_b)],
      [{ ...state, path: ["users"] }, getSomeJSON(query, "users")],
      [{ ...state, path: ["users", p_b] }, getSomeJSON(query, "users", p_b)]
    ]).get(state)) || null
  )
}
export const router = hurl_router(routes)
