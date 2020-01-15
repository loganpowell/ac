import { replaceMeta } from "../../src/commands"

document.addEventListener("DOMContentLoaded", () => {
  replaceMeta({
    HEAD_meta: {
      "og:title": "just a test content injection",
      "og:image": "https://i.imgur.com/BOdIBQz.gif"
    },
    HEAD_title: "A new title"
  })
})
// console.log("navigator.userAgent:", navigator.userAgent)
