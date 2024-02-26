"use client"

import { atom, useAtom } from "jotai"
import { Fragment, Suspense, createContext, use, useContext } from "react"
import { CustomEmojiProps } from "react-mfm"
import { fetchEmojiUrl } from "~/features/api"

export const CustomEmojiCtx = createContext<{ host: string | null }>({ host: null })

// Hooks
const cacheAtom = atom<{ [host: string]: { [name: string]: string | null } }>({})
const useEmojiCache = () => {
  const [cache, setCache] = useAtom(cacheAtom)
  const addCache = (host: string, name: string, url: string | null) => {
    if (hasCache(host, name)) return
    setCache({
      ...cache,
      [host]: { ...cache[host], [name]: url },
    })
  }
  const hasCache = (host: string, name: string) => host in cache && name in cache[host]
  return { cache, addCache, hasCache }
}

// Internal Components

const EmojiImg = ({ name, url }: { name: string; url?: string }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function FetchEmoji({ name, host }: { name: string; host: string }) {
  const { cache, addCache, hasCache } = useEmojiCache()

  const url = hasCache(host, name) ? cache[host][name] : use(fetchEmojiUrl(name, host))
  addCache(host, name, url)
  return <EmojiImg name={name} url={url ?? undefined} />
}

// Components

export default function CustomEmoji({ name }: CustomEmojiProps) {
  const { cache } = useEmojiCache()
  const { host } = useContext(CustomEmojiCtx)
  if (!host) return <EmojiImg name={name} />
  return (
    <Suspense fallback={<EmojiImg name={name} url={cache[host]?.[name] ?? undefined} />}>
      <FetchEmoji name={name} host={host} />
    </Suspense>
  )
}

export const CustomEmojiStr = ({ text }: { text: string }) =>
  text.split(":").map((s, i) => (i % 2 ? <CustomEmoji name={s} key={i} /> : <Fragment key={i}>{s}</Fragment>))
