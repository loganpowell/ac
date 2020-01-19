import { registerCMD } from "../register"

/**

;(function() {
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link")
  link.type = "image/x-icon"
  link.rel = "shortcut icon"
  link.href = "https://thi.ng/favicon.ico"
  document.getElementsByTagName("head")[0].appendChild(link)
})()
    */

export const setFavicon = href => {
  let link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link")
  link.type = "image/x-icon"
  link.rel = "shortcut icon"
  link.href = href
  document.getElementsByTagName("head")[0].appendChild(link)
}

export const injectMeta = (type, content, prop) => {
  try {
    return {
      HEAD_meta: () => {
        document.head.querySelector(
          `meta[property="${prop}"]`
        ).content = content
      },
      HEAD_title: () => {
        document.title = content
      },
      HEAD_favicon: () => setFavicon(content)
    }[type]()
  } catch (e) {
    console.warn(
      e,
      "no <head> `injectMeta` handler for prop:",
      type,
      `
    supported properties: HEAD_meta, HEAD_title
      `
    )
  }
}

export const replaceMeta = (obj = defalt_cfg) => {
  Object.entries(obj).forEach(([key, val]) => {
    try {
      return {
        HEAD_title: () => injectMeta(key, val),
        HEAD_meta: () => {
          Object.entries(val).forEach(([prop, content]) => {
            injectMeta(key, content, prop)
          })
        },
        HEAD_favicon: () => injectMeta(key, val)
      }[key]()
    } catch (e) {
      console.warn(
        e,
        "no <head> `replaceMeta` handler for prop:",
        key,
        `
        supported properties: HEAD_meta, HEAD_title
        `
      )
    }
  })
}

const defalt_cfg = {
  meta: {
    "og:title": "My thi.ng",
    "og:image":
      "https://pbs.twimg.com/profile_images/628007635867037696/fmPqne2U_400x400.png",
    "og:image:width": 400,
    "og:image:height": 400,
    "og:description": "web app",
    "og:type": "website"
  },
  title: "My thi.ng",
  favicon: "https://thi.ng/favicon.ico"
}

export const HEAD_CMD = ({
  title = defalt_cfg.meta.title,
  description = defalt_cfg.meta["og:description"],
  image: {
    url = defalt_cfg.meta["og:image"],
    height = defalt_cfg.meta["og:image:height"],
    width = defalt_cfg.meta["og:image:width"]
  },
  favicon = defalt_cfg.favicon,
  type = defalt_cfg.meta["og:type"]
}) => ({
  HEAD_meta: {
    /**
     *
     * TODO: consider prerendering only open graph header
     *
     * og:url can tell scrapers to ignore the page and
     * scrape this instead. Would save scraping the whole
     * page and might be friendlier for `jsdom`
     *
     */
    // "og:url": history.state.URL,
    "og:title": title,
    "og:type": type,
    "og:description": description,
    "og:image:width": width,
    "og:image:height": height,
    "og:image": url
  },
  HEAD_title: title,
  HEAD_favicon: favicon
})

export const INJECT_HEAD_CMD = registerCMD({
  // source$: DOMnavigated$,
  sub$: "INJECT_HEAD_CMD",
  args: ({ URL_data }) => ({ URL_data }),
  handler: ({
    URL_data: {
      head: { title, description, image, favicon, type }
    }
  }) => replaceMeta(HEAD_CMD({ title, description, image, favicon, type }))
})
