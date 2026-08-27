import { Fragment, createContext } from "preact"
import { useContext, useEffect } from "preact/hooks"
import { useForeignAPI } from "~/features/api"
import { persistedSignal } from "~/utils"

const emojiCacheSignal = persistedSignal<{
  [host: string]: { [name: string]: string | null }
}>("minsk::emoji::cache", {})

// internal

const EmojiImg = ({ name, url }: { name: string; url?: string | null }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function FetchEmoji({ name, host }: { name: string; host: string }) {
  const api = useForeignAPI(host)
  const cache = emojiCacheSignal.value

  useEffect(() => {
    if (!api || (host in cache && name in cache[host])) return
    api.emojiUrl(name).then(url => {
      emojiCacheSignal.value = {
        ...emojiCacheSignal.value,
        [host]: { ...emojiCacheSignal.value[host], [name]: url },
      }
    })
  }, [api, name, host, cache])

  return <EmojiImg name={name} url={cache[host]?.[name]} />
}

// Components

export const CustomEmojiCtx = createContext<{ host: string | null }>({ host: null })

export default function CustomEmoji({ name }: { name: string }) {
  const { host } = useContext(CustomEmojiCtx)

  if (!host) return <EmojiImg name={name} />
  return <FetchEmoji name={name} host={host} />
}

export const CustomEmojiStr = ({ text }: { text: string }) =>
  text.split(":").map((s, i) =>
    i % 2 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: split order is stable
      <CustomEmoji name={s} key={i} />
    ) : (
      <Fragment key={s}>{s}</Fragment>
    ),
  )
