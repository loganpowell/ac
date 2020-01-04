export * from "./parse_URL"
export * from "./stringify_type"
export * from "./traceStream"
export * from "./unknown_key_ERR"
export * from "./discardable"

export const delay = t => new Promise(resolve => setTimeout(resolve, t))
