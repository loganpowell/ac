// Based on https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
// and https://tailwindcss.com/components

export const borderWidths = {
  px: "1px",
  "0": "0",
  "2": "2px",
  "4": "4px",
  "8": "8px"
}

export const breakpoints = ["640px", "768px", "1024px", "1280px"]

export const baseColors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  blueCool: [
    "#e7f2f5",
    "#dae9ee",
    "#adcfdc",
    "#82b4c9",
    "#6499af",
    "#3a7d95",
    "#2e6276",
    "#224a58",
    "#14333d",
    "#0f191c"
  ],
  blueCoolVivid: [
    "#e1f3f8",
    "#97d4ea",
    "#59b9de",
    "#28a0cb",
    "#0d7ea2",
    "#07648d",
    "#074b69",
    "#002d3f"
  ],
  blueWarm: [
    "#ecf1f7",
    "#e1e7f1",
    "#bbcae4",
    "#98afd2",
    "#7292c7",
    "#4a77b4",
    "#345d96",
    "#2f4668",
    "#252f3e",
    "#13171f"
  ],
  blueWarmVivid: [
    "#b7caf0",
    "#81aefc",
    "#5994f6",
    "#2672de",
    "#0050d8",
    "#1a4480",
    "#162e51"
  ],
  blue: [
    "#eff6fb",
    "#d9e8f6",
    "#aacdec",
    "#73b3e7",
    "#4f97d1",
    "#2378c3",
    "#2c608a",
    "#274863",
    "#1f303e",
    "#11181d"
  ],
  blueVivid: ["#58b4ff", "#2491ff", "#0076d6", "#005ea2", "#0b4778", "#112f4e"],
  cyan: [
    "#e7f6f8",
    "#ccecf2",
    "#9ddfeb",
    "#6ecbdb",
    "#449dac",
    "#168092",
    "#2a646d",
    "#2c4a4e",
    "#203133",
    "#111819"
  ],
  cyanVivid: ["#a8f2ff", "#52daf2", "#00bde3", "#009ec1"],
  gold: [
    "#f5f0e6",
    "#f1e5cd",
    "#dec69a",
    "#c7a97b",
    "#ad8b65",
    "#8e704f",
    "#6b5947",
    "#4d4438",
    "#322d26",
    "#191714"
  ],
  goldVivid: ["#fef0c8", "#ffe396", "#ffbe2e", "#e5a000", "#c2850c", "#936f38"],
  grayCool: [
    "#fbfcfd",
    "#f7f9fa",
    "#f5f6f7",
    "#f1f3f6",
    "#edeff0",
    "#dcdee0",
    "#c6cace",
    "#a9aeb1",
    "#8d9297",
    "#71767a",
    "#565c65",
    "#3d4551",
    "#2d2e2f",
    "#1c1d1f"
  ],
  grayWarm: [
    "#fcfcfb",
    "#f9f9f7",
    "#f6f6f2",
    "#f5f5f0",
    "#f0f0ec",
    "#e6e6e2",
    "#cac9c0",
    "#afaea2",
    "#929285",
    "#76766a",
    "#5d5d52",
    "#454540",
    "#2e2e2a",
    "#171716"
  ],
  gray: [
    "#fcfcfc",
    "#f9f9f9",
    "#f6f6f6",
    "#f3f3f3",
    "#f0f0f0",
    "#e6e6e6",
    "#c9c9c9",
    "#adadad",
    "#919191",
    "#757575",
    "#5c5c5c",
    "#454545",
    "#2e2e2e",
    "#1b1b1b",
    "#000000"
  ],
  greenCool: [
    "#ecf3ec",
    "#dbebde",
    "#b4d0b9",
    "#86b98e",
    "#5e9f69",
    "#4d8055",
    "#446443",
    "#37493b",
    "#28312a",
    "#1a1f1a"
  ],
  greenCoolVivid: [
    "#e3f5e1",
    "#b7f5bd",
    "#70e17b",
    "#21c834",
    "#00a91c",
    "#008817"
  ],
  greenWarm: [
    "#f1f4d7",
    "#e7eab7",
    "#cbd17a",
    "#a6b557",
    "#8a984b",
    "#6f7a41",
    "#5a5f38",
    "#45472f",
    "#2d2f21",
    "#171712"
  ],
  greenWarmVivid: [
    "#f1f6a5",
    "#e2f106",
    "#c5d30a",
    "#a3b72c",
    "#7e9c1d",
    "#6a7d00"
  ],
  green: [
    "#eaf4dd",
    "#dfeacd",
    "#b8d293",
    "#9bb672",
    "#7d9b4e",
    "#607f35",
    "#4c6424",
    "#3c4a29",
    "#293021",
    "#161814"
  ],
  greenVivid: [
    "#ddf9c7",
    "#c3ee90",
    "#98d035",
    "#7fb135",
    "#719f2a",
    "#538200"
  ],
  indigoCool: [
    "#eef0f9",
    "#e1e6f9",
    "#bbc8f5",
    "#96abee",
    "#6b8ee8",
    "#496fd8",
    "#3f57a6",
    "#374274",
    "#292d42",
    "#151622"
  ],
  indigoCoolVivid: ["#628ef4", "#4150f2"],
  indigoWarm: [
    "#f1eff7",
    "#e7e3fa",
    "#cbc4f2",
    "#afa5e8",
    "#9287d8",
    "#7665d1",
    "#5e519e",
    "#453c7b",
    "#2e2c40",
    "#18161d"
  ],
  indigoWarmVivid: ["#b69fff", "#967efb", "#745fe9", "#5942d2"],
  indigo: [
    "#efeff8",
    "#e5e4fa",
    "#c5c5f3",
    "#a5a8eb",
    "#8889db",
    "#676cc8",
    "#4d52af",
    "#3d4076",
    "#2b2c40",
    "#16171f"
  ],
  indigoVivid: ["#c4c6f2", "#a5a8e8", "#656bd7", "#4d52b0"],
  magenta: [
    "#f9f0f2",
    "#f6e1e8",
    "#f0bbcc",
    "#e895b3",
    "#e0699f",
    "#c84281",
    "#8b4566",
    "#66364b",
    "#402731",
    "#1b1617"
  ],
  magentaVivid: [
    "#ffddea",
    "#ffb4cf",
    "#ff87b2",
    "#fd4496",
    "#d72d79",
    "#ab2165"
  ],
  mintCool: [
    "#e0f7f6",
    "#c4eeeb",
    "#9bd4cf",
    "#6fbab3",
    "#4f9e99",
    "#21827f",
    "#376462",
    "#2a4b45",
    "#203131",
    "#111818"
  ],
  mintCoolVivid: ["#d5fbf3", "#7efbe1", "#29e1cb", "#1dc2ae", "#00a398"],
  mint: [
    "#dbf6ed",
    "#c7efe2",
    "#92d9bb",
    "#5abf95",
    "#34a37e",
    "#1f8462",
    "#286846",
    "#204e34",
    "#193324",
    "#0d1a12"
  ],
  mintVivid: ["#c9fbeb", "#5dfdc8", "#0ceda6", "#04c585", "#146947"],
  orangeWarm: [
    "#faeee5",
    "#fbe0d0",
    "#f7bca2",
    "#f3966d",
    "#e17141",
    "#bd5727",
    "#914734",
    "#633a32",
    "#3d2925",
    "#1c1615"
  ],
  orangeWarmVivid: ["#fbbaa7", "#fc906d", "#ff580a", "#d24302"],
  orange: [
    "#f6efe9",
    "#f2e4d4",
    "#f3bf90",
    "#f09860",
    "#dd7533",
    "#a86437",
    "#775540",
    "#524236",
    "#332d27",
    "#1b1614"
  ],
  orangeVivid: [
    "#fef2e4",
    "#fce2c5",
    "#ffbc78",
    "#fa9441",
    "#e66f0e",
    "#c05600"
  ],
  redCool: [
    "#f8eff1",
    "#f3e1e4",
    "#ecbec6",
    "#e09aa6",
    "#e16b80",
    "#cd425b",
    "#9e394b",
    "#68363f",
    "#40282c",
    "#1e1517"
  ],
  redCoolVivid: [
    "#f8dfe2",
    "#f8b9c5",
    "#fd8ba0",
    "#f45d79",
    "#e41d3d",
    "#b21d38",
    "#822133"
  ],
  redWarm: [
    "#f6efea",
    "#f4e3db",
    "#ecc0a7",
    "#dca081",
    "#d27a56",
    "#c3512c",
    "#805039",
    "#524236",
    "#332d29",
    "#1f1c18"
  ],
  redWarmVivid: ["#f6bd9c", "#f39268", "#ee601d", "#d63e04"],
  red: [
    "#f9eeee",
    "#f8e1de",
    "#f7bbb1",
    "#f2938c",
    "#e9695f",
    "#d83933",
    "#a23737",
    "#6f3331",
    "#3e2927",
    "#1b1616"
  ],
  redVivid: [
    "#fde0db",
    "#fdb8ae",
    "#ff8d7b",
    "#fb5a47",
    "#e52207",
    "#b50909",
    "#8b0a03",
    "#5c1111"
  ],
  violetWarm: [
    "#f8f0f9",
    "#f6dff8",
    "#e2bee4",
    "#d29ad8",
    "#bf77c8",
    "#b04abd",
    "#864381",
    "#5c395a",
    "#382936",
    "#1b151b"
  ],
  violetWarmVivid: [
    "#fbebfd",
    "#fbdcff",
    "#f4b2ff",
    "#ee83ff",
    "#d85bef",
    "#be32d0"
  ],
  violet: [
    "#f4f1f9",
    "#ebe3f9",
    "#d0c3e9",
    "#b8a2e3",
    "#9d84d2",
    "#8168b3",
    "#665190",
    "#4c3d69",
    "#312b3f",
    "#18161d"
  ],
  violetVivid: [
    "#ede3ff",
    "#d5bfff",
    "#c39deb",
    "#ad79e9",
    "#9355dc",
    "#783cb9",
    "#562b97"
  ],
  yellow: [
    "#faf3d1",
    "#f5e6af",
    "#e6c74c",
    "#c9ab48",
    "#a88f48",
    "#8a7237",
    "#6b5a39",
    "#504332",
    "#332d27",
    "#1a1614"
  ],
  yellowVivid: ["#fee685", "#face00"]
}

const commonButtonStyles = {
  py: 2,
  px: 3,
  cursor: "pointer",
  fontSize: "100%",
  lineHeight: "inherit",
  whiteSpace: "nowrap"
}

export const buttons = {
  simple: {
    ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primaryHover",
      textDecoration: "none"
    }
  },
  pill: {
    ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "full",
    "&:hover": {
      backgroundColor: "primaryHover"
    }
  },
  outline: {
    ...commonButtonStyles,
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "primary",
    color: "primary",
    fontWeight: "semibold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primary",
      color: "white",
      borderColor: "transparent"
    }
  },
  bordered: {
    ...commonButtonStyles,
    backgroundColor: "primary",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "primaryHover",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primaryHover"
    }
  },
  disabled: {
    ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    opacity: 0.5,
    cursor: "not-allowed",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default"
  },
  "3D": {
    ...commonButtonStyles,
    backgroundColor: "primary",
    border: "none",
    borderBottomWidth: "4px",
    borderBottomStyle: "solid",
    borderBottomColor: "primaryHover",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)"
    }
  },
  elevated: {
    ...commonButtonStyles,
    backgroundColor: "white",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "gray.4",
    color: "text",
    fontWeight: "bold",
    borderRadius: "default",
    boxShadow: "default",
    "&:hover": {
      backgroundColor: "gray.1"
    }
  }
}

export const colors = {
  ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[8],
  background: baseColors.white,
  primary: baseColors.blue[7],
  primaryHover: baseColors.blue[8],
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green[3],
  info: baseColors.blue[4],
  warning: baseColors.yellow[3],
  danger: baseColors.red[3],
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6]
}

export const baseFonts = {
  sans: '"Open Sans", system-ui',
  serif: "Merriweather, system-ui",
  mono: '"Fira Code",monospace'
}

export const fonts = {
  ...baseFonts,
  body: baseFonts.sans,
  heading: baseFonts.serif,
  monospace: baseFonts.mono
}

export const fontSizes = [
  "0.875rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "1.875rem",
  "2.25rem",
  "3rem",
  "4rem",
  "4.5rem"
]

export const baseFontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
}

export const fontWeights = {
  ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold
}

const commonInputStyles = {
  py: 2,
  px: 3,
  fontSize: "100%",
  borderRadius: "default",
  appearance: "none",
  lineHeight: "tight"
}

export const inputs = {
  shadow: {
    ...commonInputStyles,
    border: "none",
    color: "gray.7",
    boxShadow: "default",
    "&:focus": {
      outline: "none",
      boxShadow: "outline"
    }
  },
  inline: {
    ...commonInputStyles,
    backgroundColor: "gray.2",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.2",
    color: "gray.7",
    "&:focus": {
      outline: "none",
      borderColor: "primary",
      backgroundColor: "white"
    }
  },
  underline: {
    ...commonInputStyles,
    backgroundColor: "transparent",
    border: "none",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "primary",
    borderRadius: "0px",
    color: "gray.7",
    "&:focus": {
      outline: "none",
      borderColor: "primary",
      backgroundColor: "white"
    }
  }
}

export const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
}

export const baseLineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
}

export const lineHeights = {
  ...baseLineHeights,
  body: baseLineHeights.relaxed,
  heading: baseLineHeights.tight
}

export const radii = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  lg: "0.5rem",
  full: "9999px"
}

export const sizes = {
  px: "1px",
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  full: "100%",
  screenHeight: "100vh",
  screenWidth: "100vw"
}

export const shadows = {
  default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 0px 2px rgba(0, 0, 0, 0.03)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  none: "none"
}

export const space = [
  0,
  "0.25rem",
  "0.5rem",
  "1rem",
  "2rem",
  "4rem",
  "8rem",
  "16rem",
  "32rem"
]

export const zIndices = {
  auto: "auto",
  "0": "0",
  "10": "10",
  "20": "20",
  "30": "30",
  "40": "40",
  "50": "50"
}

const heading = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
  mt: 4
}

export const styles = {
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body"
  },
  p: {
    lineHeight: [1.75, 2],
    fontSize: [1, 2],
    mt: [0, 1]
  },
  a: {
    color: "primary",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  strong: {
    fontWeight: "bold"
  },
  ul: {
    listStylePostition: "outside",
    mt: 2,
    mx: 0
  },
  li: {
    listStyleType: "disc",
    lineHeight: 1.75,
    fontSize: [2, 3],
    mt: 3
  },
  h1: {
    ...heading,
    fontSize: [6, 7],
    mt: 6
  },
  h2: {
    ...heading,
    fontSize: [5, 6],
    pt: 5
  },
  h3: {
    ...heading,
    fontSize: [4, 5],
    pt: 4
  },
  h4: {
    ...heading,
    fontSize: [3, 4],
    pt: 4
  },
  h5: {
    ...heading,
    fontSize: [2, 3]
  },
  h6: {
    ...heading,
    fontSize: [1, 2]
  },
  pre: {
    lineHeight: 1.75,
    my: 4,
    mx: -2
  },
  code: {
    boxShadow: "inner",
    background:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat",
    color: "dark",
    fontSize: [0, 1],
    fontFamily: "mono",
    borderRadius: "default",
    p: 1
  },
  hr: {
    background:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat",
    height: 1,
    width: "100vw",
    position: "relative",
    marginLeft: "-50vw",
    mt: 6,
    left: "50%"
  },
  blockquote: {
    background:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPUlEQVQYV2NkQAN37979r6yszIgujiIAU4RNMVwhuiQ6H6wQl3XI4oy4FMHcCJPHcDS6J2A2EqUQpJhohQDexSef15DBCwAAAABJRU5ErkJggg==) repeat",
    fontFamily: "mono",
    fontStyle: "italic",
    fontSize: [3, 4],
    lineHeight: 1.5,
    mx: -4,
    my: 4,
    p: 5
  },
  table: {
    borderRadius: "default",
    overflow: "hidden",
    fontSize: [1, 2],
    width: "100%",
    mt: 4
  },
  tr: {
    backgroundColor: "muted",
    "&:first-child": {
      fontWeight: "bold",
      backgroundColor: "dark",
      color: "muted"
    },
    lineHeight: [1.75, 2],
    "&:nth-child(2n)": {
      backgroundColor: "background"
    }
  },
  td: {
    p: 2
  },
  img: {
    display: "block",
    my: [2, 3],
    objectFit: "cover",
    borderRadius: "default"
  }
}

export const theme = {
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  sizes,
  shadows,
  space,
  radii,
  zIndices,
  styles,
  buttons,
  inputs
}

export default theme
