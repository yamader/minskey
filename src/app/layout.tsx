import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import { Metadata } from "next"

import "@fontsource-variable/fira-code"
import "@fontsource-variable/inter"
import "@fontsource/zen-kaku-gothic-new/400.css"
import "@fontsource/zen-kaku-gothic-new/700.css"
import "@fontsource/zen-kaku-gothic-new/900.css"
import "./global.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://minskey.dyama.net"),
  title: {
    default: "minskey",
    template: "%s :: minskey",
  },
  description: "A minimal Misskey client",
  applicationName: "minskey",
  icons: "/favicon.png",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    images: "/favicon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Theme asChild>{children}</Theme>
      </body>
    </html>
  )
}
