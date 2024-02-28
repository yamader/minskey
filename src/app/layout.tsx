import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import clsx from "clsx"
import { Metadata } from "next"
import { Fira_Code, Inter, Zen_Kaku_Gothic_New } from "next/font/google"
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--f-inter",
})

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "700", "900"],
  preload: false,
  variable: "--f-zkgn",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--f-firacode",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={"max-h-screen" /* todo: fix */}>
        <Theme
          className={clsx(
            inter.variable,
            firaCode.variable,
            zenKakuGothicNew.variable,
            zenKakuGothicNew.className,
          )}
          asChild>
          {children}
        </Theme>
      </body>
    </html>
  )
}
