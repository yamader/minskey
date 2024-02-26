import { atom, useAtomValue } from "jotai"
import { Channels, Endpoints, Stream, api, entities } from "misskey-js"

import { accountAtom } from "~/features/auth"

// types

type noteHandler = (payload: entities.Note) => void

export type TLChanNames = {
  [T in keyof Channels]: Channels[T]["events"] extends { note: noteHandler } ? T : never
}[keyof Channels]

export const TLChanNameToAPIEndpoint: Record<TLChanNames, keyof Endpoints> = {
  globalTimeline: "notes/global-timeline",
  homeTimeline: "notes/timeline",
  localTimeline: "notes/local-timeline",
  hybridTimeline: "notes/hybrid-timeline",
}

// atoms

export const apiAtom = atom(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new api.APIClient({
    origin: `${account.proto}://${account.host}`,
    credential: account.token,
  })
})

export const streamConnectAtom = atom(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new Stream(`${account.proto}://${account.host}`, { token: account.token })
})

// hooks

export function useAPI() {
  return useAtomValue(apiAtom)
}

export function useStream<T extends keyof Channels>(channel: T) {
  const stream = useAtomValue(streamConnectAtom)
  return stream?.useChannel(channel) ?? null
}

// utils

export async function fetchEmojiUrl(name: string, host: string): Promise<string | null> {
  console.log("fetching emoji", name, host)
  const json = await fetch(`https://${host}/api/emoji?name=${name}`)
    .then(res => res.json())
    .catch(e => (console.warn(e), {}))

  if (!json.url) {
    console.log(`Emoji not found: ${name}`)
    return null
  }
  return json.url
}
