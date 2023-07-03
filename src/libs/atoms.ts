import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { api, ChannelConnection, entities, Stream } from "misskey-js"

// Account

type Account = {
  proto: string
  host: string
  token: string
}

export const accountAtom = atomWithStorage<Account | null>("account", null)

// Auth

type AuthSession = {
  id: string
  proto: string
  host: string
}

export const authSessionAtom = atomWithStorage<AuthSession | null>("authSession", null)
export const authErrorAtom = atom("")

// Misskey API

export const apiAtom = atom<api.APIClient | null>(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new api.APIClient({
    origin: `${account.proto}://${account.host}`,
    credential: account.token,
  })
})

export const streamConnectAtom = atom<Stream | null>(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new Stream(`${account.proto}://${account.host}`, { token: account.token })
})

// 各Timelineはjotaiで管理しないでTimeLineページだけで扱えばいいかもしれない
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

export const srtreamGTLChannelAton = atom<ChannelConnection<{
  params: null
  events: {
    note: (payload: entities.Note) => void
  }
  receives: null
}> | null>(get => {
  const connect = get(streamConnectAtom)
  if (!connect) return null
  return connect.useChannel("globalTimeline")
})



// Global State

export const profileAtom = atom<Promise<entities.UserLite | null>>(async get => {
  const api = get(apiAtom)
  if (!api) return null
  return await api.request("i").catch(() => null)
})
