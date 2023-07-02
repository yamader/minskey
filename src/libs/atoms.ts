import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { api, ChannelConnection, Channels, entities, Stream } from "misskey-js"

// Account

type Account = {
  host: string
  token: string
}

export const accountAtom = atomWithStorage<Account | null>("account", null)

// Auth

type AuthSession = {
  id: string
  host: string
}

export const authSessionAtom = atomWithStorage<AuthSession | null>("authSession", null)
export const authErrorAtom = atom("")

// Misskey API

export const apiAtom = atom<api.APIClient | null>(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new api.APIClient({
    origin: `https://${account.host}`,
    credential: account.token,
  })
})

export const streamConnectAtom = atom<Stream | null>(get => {
  const accout = get(accountAtom)
  if (!accout) return null
  return new Stream("https://"+ accout.host, { token: accout.token })
})

export const streamHTLChannelAtom = atom<ChannelConnection<{
  params: null
  events: {
    note: (payload: entities.Note) => void
  }
  receives: null
}> | null>(get => {
  const connect = get(streamConnectAtom)
  if (!connect) return null
  return connect.useChannel("homeTimeline")
})

// Global State

export const profileAtom = atom<Promise<entities.UserLite | null>>(async get => {
  const api = get(apiAtom)
  if (!api) return null
  return await api.request("i").catch(() => null)
})
