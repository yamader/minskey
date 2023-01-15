import "~/global.css"

import { Inter, Zen_Kaku_Gothic_New } from "@next/font/google"
import { Provider } from "jotai"
import { AppProps } from "next/app"
import Head from "next/head"

const inter = Inter({
  subsets: ["latin"],
  variable: "--f-inter",
})

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "700", "900"],
  preload: false,
  variable: "--f-zkgn",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>minskey</title>
        <meta name="description" content="minimal misskey client" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="minskey" />
        <meta property="og:image" content="https://minskey.dyama.net/icon.png" />
      </Head>
      <Provider>
        <main className={[inter.variable, zenKakuGothicNew.variable, zenKakuGothicNew.className].join(" ")}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  )
}
