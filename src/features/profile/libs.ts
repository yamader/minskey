import { atom, useAtomValue } from "jotai"
import { entities } from "misskey-js"

import { apiAtom } from "~/features/api/libs"
import { useLogin } from "~/features/auth/libs"

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
  return `/profile?user=@${user.username}@${user.host}`
}

// atoms

export const profileAtom = atom(async get => {
  const api = get(apiAtom)
  return api?.request("i").catch(() => null) ?? null
})

// hooks

export function useProfile() {
  return useAtomValue(profileAtom)
}
