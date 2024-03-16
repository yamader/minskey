"use client"

import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Fragment, Suspense, createContext, use, useContext } from "react"
import { CustomEmojiProps } from "react-mfm"
import { useForeignAPI } from "~/features/api"

const emojiCacheAtom = atomWithStorage<{
  [host: string]: { [name: string]: string | null }
}>("minsk::emoji::cache", {})

const emojiFetchAtom = atom<{ [id: string]: Promise<string | null> }>({})

// internal

const EmojiImg = ({ name, url }: { name: string; url?: string | null }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function FetchEmoji({ name, host }: { name: string; host: string }) {
  const api = useForeignAPI(host)
  const [cache, setCache] = useAtom(emojiCacheAtom)
  const [fetches, setFetches] = useAtom(emojiFetchAtom)

  const key = name + "@" + host

  const Cached = () => <EmojiImg name={name} url={cache[host]?.[name]} />
  if (host in cache && name in cache[host]) return <Cached />
  if (!api) return <Cached />

  if (key in fetches) {
    const url = use(fetches[key])
    setCache({ ...cache, [host]: { ...cache[host], [name]: url } })
    delete fetches[key]
    setFetches({ ...fetches })
    return <EmojiImg name={name} url={url} />
  }

  const task = api.emojiUrl(name)
  setFetches({ ...fetches, [key]: task })
  return <EmojiImg name={name} url={use(task)} />
}

// Components

export const CustomEmojiCtx = createContext<{ host: string | null }>({ host: null })

export default function CustomEmoji({ name }: CustomEmojiProps) {
  const cache = useAtomValue(emojiCacheAtom)
  const { host } = useContext(CustomEmojiCtx)

  if (!host) return <EmojiImg name={name} />
  return (
    <Suspense fallback={<EmojiImg name={name} url={cache[host]?.[name]} />}>
      <FetchEmoji name={name} host={host} />
    </Suspense>
  )
}

export const CustomEmojiStr = ({ text }: { text: string }) =>
  text
    .split(":")
    .map((s, i) => (i % 2 ? <CustomEmoji name={s} key={i} /> : <Fragment key={i}>{s}</Fragment>))
