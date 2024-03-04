import { atom, useAtomValue } from "jotai"
import { entities } from "misskey-js"
import { hostname } from "~/utils"
import { accountAtom } from "../auth"
import { clientsAtom } from "../api"

// utils

export function statusEmoji(status: entities.UserLite["onlineStatus"] = "unknown") {
  switch (status) {
    case "online":
      return "🟢"
    case "active":
      return "🟡"
    case "offline":
      return "💤"
    case "unknown":
      return "❓"
  }
}

export function profileLink(user: entities.UserLite) {
  const host = user.host && hostname(user.host)
  return `/profile?user=@${user.username}@${host}`
}

// atoms

export const profileAtom = atom(async get => {
  /*
  const api = get(misskeyJSAtom)
  return api?.request("i").catch(() => null) ?? null
  */
  
  const account = get(accountAtom)
  const clients = get(clientsAtom)
  if (!account) return null
  return clients[account.host]?.getMe() ?? null
})

// hooks

export function useProfile() {
  return useAtomValue(profileAtom)
}
