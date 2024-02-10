"use client"

import { atom, useAtom, useAtomValue } from "jotai"
import { Suspense, createContext, use, useContext } from "react"
import { CustomEmojiProps } from "react-mfm"
import { fetchEmoji } from "~/features/api"

export const CustomEmojiCtx = createContext<{ host: string | null }>({ host: null })

const cacheAtom = atom<{ [host: string]: { [name: string]: string } }>({})

const EmojiImg = ({ name, url }: { name: string; url?: string }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function FetchEmoji({ name, host }: { name: string; host: string }) {
  const [cache, setCache] = useAtom(cacheAtom)
  if (host in cache && name in cache[host]) return <EmojiImg name={name} url={cache[host][name]} />
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
