"use client"

import clsx from "clsx"
import { Fragment } from "react"
import { useSettings } from "~/features/settings"

export default function RightNav() {
  const [settings] = useSettings()

  const w = "w-72 xl:w-96"
  return (
    <div className={clsx(w, "hidden lg:block")}>
      <div className={clsx(w, "fixed flex h-full flex-col gap-4 border-l pl-8 pt-2.5")}>
        {settings.ui.rnav.map(
          (item, i) =>
            item in items && <Fragment key={i}>{items[item as keyof typeof items]()}</Fragment>,
        )}
        <div className="px-4 font-inter text-xs text-gray-600">
          <a className="hover:underline" href="/about/">
            minskeyについて
          </a>
          <p className="mt-1">
            &copy; 2024{" "}
            <a className="hover:underline" href="https://yamad.me">
              YamaD
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const items = {
  search: SearchBar,
  aichan: AiChan,
}

// todo: impl
function SearchBar() {
  return <input className="rounded-full bg-gray-200 px-4 py-2" placeholder="検索" />
}

// todo: track eyes
function AiChan() {
  return <iframe className="h-64" src="https://misskey-dev.github.io/mascot-web/?scale=1.3" />
}
