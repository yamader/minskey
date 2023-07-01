import "~/global.css"

import { Provider } from "jotai"
import { AppProps } from "next/app"
import { Fira_Code, Inter, Zen_Kaku_Gothic_New } from "next/font/google"
import Head from "next/head"
import { Suspense } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"

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
      <main
        className={[inter.variable, zenKakuGothicNew.variable, zenKakuGothicNew.className, firaCode.variable].join(
          " "
        )}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Provider>
            <Suspense fallback={<NBSK />}>
              <Component {...pageProps} />
            </Suspense>
          </Provider>
        </ErrorBoundary>
      </main>
    </>
  )
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const h2class = "mt-6 mb-3 text-4xl font-bold after:content-[':']"

  const armageddon = () => {
    alert("未実装なので，開発者ツールから自分でやってください")
    resetErrorBoundary()
  }

  return (
    <div className="flex h-full bg-sky-600 px-2 font-inter text-xl text-white">
      <div className="m-auto flex w-full max-w-5xl flex-col">
        <h1 className="mb-2 flex space-x-6 text-9xl font-black">
          <span className="hover:animate-spin">🤯</span>
          <span>Error!</span>
        </h1>

        <h2 className={h2class}>Message</h2>
        <p>A serious error has occurred in this application. However, it may be fixed by simply reloading...</p>
        <p>Nanka eigo de kaite mitakedo yousuruni oteage no joutai.</p>

        <h2 className={h2class}>Reason</h2>
        <pre className="whitespace-normal break-all font-mono">{`"${error.message}"`}</pre>

        <h2 className={h2class}>Action</h2>
        <p>
          Resetting data is a <span className="font-black uppercase">last</span> resort.
        </p>
        <div className="my-3 space-x-4 text-2xl">
          <button
            className="rounded bg-neutral-200 px-3 py-1 font-bold text-black hover:bg-neutral-300"
            onClick={resetErrorBoundary}>
            reload
          </button>
          <button className="rounded bg-red-500 px-3 py-1 font-bold uppercase hover:bg-red-600" onClick={armageddon}>
            reset all data
          </button>
        </div>
      </div>
    </div>
  )
}
