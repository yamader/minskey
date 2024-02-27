import { atom, useAtomValue } from "jotai"
import { apiAtom } from "."
import { authSessionAtom } from "../auth"



// Misskey v12系と現行の両方に対応した絵文字の型
export interface CustomEmoji {
  id?: string
  aliases: string[]
  name: string
  category: string
  url: string
  localOnly?: boolean
  isSensitive?: boolean
}

// 現行のMisskeyの絵文字一覧取得APIのレスポンス
interface EmojiListResponse {
  emojis: CustomEmoji[]
}
export async function fetchLocalEmojiList(host: string): Promise<EmojiListResponse> {
  const json = await fetch(`https://${host}/api/emojis`)
    .then(res => res.json())
    .catch(e => (console.warn(e), {}))

  return json as EmojiListResponse
}

// 絵文字一覧のAtom
const localEmojiListAtom = atom(async get => {
  const emojiList: CustomEmoji[] = []

  const api = get(apiAtom)
  const auth = get(authSessionAtom)

  if (!api || !auth) return []

  const metaEmojis: CustomEmoji[] = (await api.request("meta")).emojis
  if (metaEmojis) {
    emojiList.push(...metaEmojis)
  } else {
    emojiList.push(...(await fetchLocalEmojiList(auth.host)).emojis)
  }

  return emojiList
})

// Todo: cache
//const localEmojiListCacheAtom = atomWithStorage<CustomEmoji[]>("minsk::emoji::localList", [])

export const useEmojiList = () => useAtomValue(localEmojiListAtom)
