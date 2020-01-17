export * from "./parse_URL"
export * from "./stringify_type"
export * from "./traceStream"
export * from "./unknownKey"
export * from "./FLIP"
export * from "./scrollIntoCenter"

export const msTaskDelay = t => new Promise(resolve => setTimeout(resolve, t))
