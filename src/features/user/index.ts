export * from "./types"

import { atom, useAtom } from "jotai"
import { hostname } from "~/utils"
import { User, UserStatus } from "./types"

const userCacheAtom = atom<{ [id: string]: User }>({})

export function useUsers() {
  return useAtom(userCacheAtom)
}

export function statusEmoji(status: UserStatus = "unknown") {
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

export function profileLink(user: User) {
  const host = user.host && hostname(user.host)
  return `/profile?user=@${user.username}@${host}`
}
