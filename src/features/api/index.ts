import { atom, useAtom, useAtomValue } from "jotai"
import { Channels, Endpoints, Stream, api, entities } from "misskey-js"
import { use, useState } from "react"
import { accountAtom, useAccount } from "~/features/auth"
import { ensureproto } from "~/utils"
import { APIClient, detect } from "./clients"

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

export type Emoji = {
  name: string
  url: string
}

// atoms
export const clientsAtom = atom<{ [host: string]: APIClient | null }>({})

/** @deprecated */
export const misskeyJSAtom = atom(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new api.APIClient({
    origin: account.host,
    credential: account.token,
  })
})

export const streamConnectAtom = atom(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new Stream(account.host, { token: account.token })
})

// hooks

export function useAPI(host?: string) {
  const account = useAccount()
  const [clients, setClients] = useAtom(clientsAtom)
  const [clientFetch, setClientFetch] = useState<Promise<APIClient | null>>()

  const _host = (host && ensureproto(host)) ?? account?.host
  if (!_host) return null
  if (_host in clients) return clients[_host]
  if (!clientFetch) {
    const task = detect(_host, account?.token)
    setClientFetch(task)
    return use(task)
  }

  const api = use(clientFetch)
  setClients({ ...clients, [_host]: api })
  return api
}

/** @deprecated */
export function useMisskeyJS() {
  return useAtomValue(misskeyJSAtom)
}

export function useStream<T extends keyof Channels>(channel: T) {
  const stream = useAtomValue(streamConnectAtom)
  return stream?.useChannel(channel) ?? null
}
