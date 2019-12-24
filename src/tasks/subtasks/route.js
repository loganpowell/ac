import { parse_href } from "../../utils"

const default_meta = {
  meta_image: "https://picsum.photos/1000/600.jpg",
  meta_description: "a website for something",
  meta_title: "some page",
  meta_url: "https://somewebsite.com/home",
  title_NA: "Some Page"
}

export const route = ({ href, data }) => [
  {
    sub$: "FLIP",
    // options (1): https://github.com/davidkpiano/flipping#new-flippingoptions
    // options (2): https://github.com/aholachek/react-flip-toolkit/tree/7382f9380200f5a85296621db852ea2513cc5eec/packages/flip-toolkit
    args: "start"
  },
  {
    sub$: "state",
    path: ["head"],
    // 📌 have to create a function that generates/overwrites these defaults...
    args: {
      meta: {
        // title: `Hyperlocals ${search && "Search Results for: " + search}`,
        "og:description": "social media for people who hate social media",
        "og:type": "website",
        "og:url": href,
        // "og:image": pic,
        "og:image:width": 1200,
        "og:image:height": 1200
      }
    }
  },
  {
    sub$: "state",
    path: ["body", "content"],
    args: { data }
  },
  {
    sub$: "state",
    path: ["body", "loading"],
    args: false
  },
  {
    sub$: "state",
    path: ["route"],
    args: { state: "parse_URL(href)" }
  },
  {
    sub$: "pushstate",
    args: { state: "route state overwritten 🔥" }
  },
  {
    sub$: "FLIP",
    args: "end"
  }
]
