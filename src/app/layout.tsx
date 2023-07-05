import "./global.css"

import { Metadata } from "next"
import { Fira_Code, Inter, Zen_Kaku_Gothic_New } from "next/font/google"

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
  metadataBase: new URL("https://minskey.dyama.net"),
  title: "minskey",
  description: "minimal misskey client",
  openGraph: {
    title: "minskey",
    images: "/icon.png",
  },
  twitter: {
    card: "summary",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [inter.variable, zenKakuGothicNew.variable, zenKakuGothicNew.className, firaCode.variable].join(" ")

  return (
    <html lang="ja" className="h-full">
      <body className={`${fonts} h-full`}>{children}</body>
    </html>
  )
}
