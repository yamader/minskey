"use client"

import { useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Fragment, Suspense, createContext, use, useContext, useState } from "react"
import { CustomEmojiProps } from "react-mfm"
import { useAPI } from "~/features/api"

// internal

// todo: invalidate
const emojiCacheAtom = atomWithStorage<{ [host: string]: { [name: string]: string | null } }>(
  "minsk::api::emojiCache",
  {},
)

const EmojiImg = ({ name, url }: { name: string; url?: string | null }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function FetchEmoji({ name, host }: { name: string; host: string }) {
  const api = useAPI(host)
  const [task, setTask] = useState<Promise<string | null>>() // たぶん要る
  const [cache, setCache] = useAtom(emojiCacheAtom)

  const Cached = () => <EmojiImg name={name} url={cache[host]?.[name]} />
  if (host in cache && name in cache[host]) return <Cached />
  if (!api) return <Cached />
  if (!task) {
    setTask(api.fetchEmojiUrl(name))
    return <Cached />
  }

  const url = use(task)
  setCache(cache => ({ ...cache, [host]: { ...cache[host], [name]: url } }))
  return <EmojiImg name={name} url={url} />
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
