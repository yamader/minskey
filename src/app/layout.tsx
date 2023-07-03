import "~/global.css"

import { Metadata } from "next"
import { Fira_Code, Inter, Zen_Kaku_Gothic_New } from "next/font/google"
import { Suspense } from "react"

import NBSK from "~/components/NBSK"

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

export const metadata: Metadata = {
  title: "minskey",
  description: "minimal misskey client",
  openGraph: {
    title: "minskey",
    images: "https://minskey.dyama.net/icon.png",
  },
  twitter: {
    card: "summary",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        className={[inter.variable, zenKakuGothicNew.variable, zenKakuGothicNew.className, firaCode.variable].join(
          " "
        )}>
        <Suspense fallback={<NBSK />}>{children}</Suspense>
      </body>
    </html>
  )
}
