import { atom, useAtom, useAtomValue } from "jotai"
import { Channels, Endpoints, Stream, api, entities } from "misskey-js"

import { use, useState } from "react"
import { accountsAtom, currentAccountIndexAtom, useAuth } from "~/features/auth"
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

// atoms
export const clientsAtom = atom<{ [host: string]: APIClient | null }>({})

/** @deprecated */
export const misskeyJSAtom = atom(get => {
  const accounts = get(accountsAtom)
  const current = get(currentAccountIndexAtom)
  if (!accounts || current === null || accounts.length - 1 < current) return null
  const account = accounts[current]

  return new api.APIClient({
    origin: `${account.proto}://${account.host}`,
    credential: account.token,
  })
})

export const streamConnectAtom = atom(get => {
  const accounts = get(accountsAtom)
  const current = get(currentAccountIndexAtom)
  if (!accounts || current === null || accounts.length - 1 < current) return null
  const account = accounts[current]

  if (!account) return null
  return new Stream(`${account.proto}://${account.host}`, { token: account.token })
})

// hooks

export function useAPI(host?: string) {
  const { account } = useAuth()

  const [clients, setClients] = useAtom(clientsAtom)
  const [clientFetch, setClientFetch] = useState<Promise<APIClient | null>>()

  let _host = host
  if (!host?.match(/^https?:\/\//)) _host = "https://" + host
  _host ??= account?.host && `${account.proto}://${account.host}`
  if (!_host) return null

  if (_host in clients) return clients[_host]
  if (!clientFetch) {
    const task = detect(_host)
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

/** @deprecated */
export async function fetchEmojiUrl(name: string, host: string): Promise<string | null> {
  const json = await fetch(`https://${host}/api/emoji?name=${name}`)
    .then(res => res.json())
    .catch(e => (console.warn(e), {}))

  return json.url ?? null
}
