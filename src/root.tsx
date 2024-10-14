import {} from "react/canary" // for use() hook

import { Theme } from "@radix-ui/themes"
import { lazy } from "react"
import { Links, Meta, MetaFunction, Outlet, Scripts, useRouteError } from "react-router"
import BSOD from "~/components/BSOD"
import "~/libs/sw"

import "@fontsource-variable/fira-code"
import "@fontsource-variable/inter"
import "@fontsource/zen-kaku-gothic-new/400.css"
import "@fontsource/zen-kaku-gothic-new/700.css"
import "@fontsource/zen-kaku-gothic-new/900.css"
import "@radix-ui/themes/styles.css"
import "~/app.css"

const base =
  import.meta.env.BASE_URL != "/" ? import.meta.env.BASE_URL : "https://minskey.dyama.net"

export const meta: MetaFunction = ({ location }) => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width" },
  { title: "minskey" },
  { name: "description", content: "A minimal Misskey client" },
  { property: "og:title", content: "minskey" },
  { property: "og:type", content: "website" },
  { property: "og:url", content: base + location.pathname },
  { property: "og:image", content: base + "/icon.png" },
]

export const links = () => [
  { rel: "manifest", href: "/manifest.json" },
  //
]

const DebugWindow = lazy(() => import("~/features/debug/DebugWindow"))

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError() as any

  return <BSOD msg={error.data} />
}

export default function App() {
  return (
    <>
      <Theme asChild>
        <Outlet />
      </Theme>
      <DebugWindow />
    </>
  )
}
