import { Theme } from "@radix-ui/themes"
import { Outlet, Scripts, useRouteError } from "@remix-run/react"
import { lazy } from "react"
import BSOD from "~/components/BSOD"

import "@fontsource-variable/fira-code"
import "@fontsource-variable/inter"
import "@fontsource/zen-kaku-gothic-new/400.css"
import "@fontsource/zen-kaku-gothic-new/700.css"
import "@fontsource/zen-kaku-gothic-new/900.css"
import "@radix-ui/themes/styles.css"
import "katex/dist/katex.min.css"
import "react-mfm/style.css"
import "~/global.css"

const DebugWindow = lazy(() => import("~/features/debug/DebugWindow"))

function Head() {
  const title = "minskey"
  const description = "A minimal Misskey client"
  const base = "https://minskey.dyama.net"

  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={base} />
      <meta property="og:image" content={base + "/favicon.png"} />

      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.png" />
    </head>
  )
}

export default function App() {
  return (
    <html>
      <Head />
      <body>
        <Theme asChild>
          <Outlet />
        </Theme>
        <DebugWindow />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  console.error(error)

  return (
    <html>
      <Head />
      <body>
        <BSOD error={error} />
      </body>
    </html>
  )
}
