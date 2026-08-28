import { render } from "preact"

import App from "./app"
import DebugWindow from "./features/debug/DebugWindow"

render(
  <>
    <App />
    <DebugWindow />
  </>,
  document.getElementById("root")!,
)
