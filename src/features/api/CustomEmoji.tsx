"use client"

import { atom, useAtom, useAtomValue } from "jotai"
import { Fragment, Suspense, createContext, use, useContext } from "react"
import { CustomEmojiProps } from "react-mfm"
import { fetchEmoji } from "~/features/api"

export const CustomEmojiCtx = createContext<{ host: string | null }>({ host: null })

const cacheAtom = atom<{ [host: string]: { [name: string]: string | undefined } }>({})

const EmojiImg = ({ name, url }: { name: string; url?: string }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function FetchEmoji({ name, host }: { name: string; host: string }) {
  const [cache, setCache] = useAtom(cacheAtom)
  //console.log(cache)
  if (host in cache && name in cache[host]) {
    const url = cache[host][name]

    if (!url) return <EmojiImg name={name} /> // 虚無がキャッシュされたときの処理
    return <EmojiImg name={name} url={url} />
  }

  // この辺のanyをなんとかしたい
  const { url } = use(fetchEmoji(name, host))
  setCache({
    ...cache,
    [host]: { ...cache[host], [name]: url },
  })
  return <EmojiImg name={name} url={url} />
}

export default function CustomEmoji({ name }: CustomEmojiProps) {
  const cache = useAtomValue(cacheAtom)
  const { host } = useContext(CustomEmojiCtx)
  if (!host) return <EmojiImg name={name} />
  return (
    <Suspense fallback={<EmojiImg name={name} url={cache[host]?.[name]} />}>
      <FetchEmoji name={name} host={host} />
    </Suspense>
  )
}

export const CustomEmojiStr = ({ text }: { text: string }) =>
  text.split(":").map((s, i) => (i % 2 ? <CustomEmoji name={s} key={i} /> : <Fragment key={i}>{s}</Fragment>))
