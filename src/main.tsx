import { render } from "preact"

import "@fontsource-variable/fira-code"
import "@fontsource-variable/inter"
import "@fontsource/zen-kaku-gothic-new/400.css"
import "@fontsource/zen-kaku-gothic-new/700.css"
import "@fontsource/zen-kaku-gothic-new/900.css"
import "./global.css"

import App from "./app"
import DebugWindow from "./features/debug/DebugWindow"

render(
  <>
    <App />
    <DebugWindow />
  </>,
  document.getElementById("root")!,
)
