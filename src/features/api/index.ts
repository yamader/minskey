import { atom, useAtomValue } from "jotai"
import { api, Channels, entities, Stream } from "misskey-js"
import { currentAccountAtom } from "../auth"

// types

type noteHandler = (payload: entities.Note) => void

export type TLChanNames = {
  [T in keyof Channels]: Channels[T]["events"] extends { note: noteHandler } ? T : never
}[keyof Channels]

// atoms

export const apiAtom = atom(get => {
  const account = get(currentAccountAtom)
  if (!account) return null
  return new api.APIClient({
    origin: `${account.proto}://${account.host}`,
    credential: account.token,
  })
})

export const streamConnectAtom = atom(get => {
  const account = get(currentAccountAtom)
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
