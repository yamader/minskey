import { atom, useAtomValue } from "jotai"
import { entities } from "misskey-js"
import { useMisskeyJS } from "~/features/api"
import { hostname } from "~/utils"

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
  const api = useMisskeyJS()
  return api?.request("i").catch(() => null) ?? null
})

// hooks

export function useProfile() {
  return useAtomValue(profileAtom)
}
