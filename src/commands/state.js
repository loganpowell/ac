import * as rand from "@thi.ng/random"
import { Atom, Cursor } from "@thi.ng/atom"
import { getIn } from "@thi.ng/paths"
import system_css from "@styled-system/css"
import de_cameled from "decamelize-keys-deep"
import {
  at_media,
  injectStyleSheet,
  PRETTY,
  css as hiccup_css
} from "@thi.ng/hiccup-css"

const log = console.log
const warn = console.warn
