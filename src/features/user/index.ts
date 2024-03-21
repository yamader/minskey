import { entities } from "misskey-js"
import { UserStatus } from "~/features/api/legacy"
import { hostname } from "~/utils"

// utils

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

export function profileLink(user: entities.UserLite) {
  const host = user.host && hostname(user.host)
  return `/profile?user=@${user.username}@${host}`
}
