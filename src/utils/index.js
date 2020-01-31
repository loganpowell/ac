export * from "./parse_URL.js"
export * from "./stringify_type.js"
export * from "./traceStream.js"
export * from "./unknownKey.js"
export * from "./insulated.js"

export const msTaskDelay = t => new Promise(resolve => setTimeout(resolve, t))
