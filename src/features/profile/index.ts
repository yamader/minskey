import { entities } from "misskey-js"
import { use, useMemo } from "react"
import { useAPI } from "~/features/api"
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

// hooks

export function useProfile() {
  // todo: ユーザのキャッシュを見るようにする
  const api = useAPI()
  const iFetch = useMemo(async () => api?.getMe() ?? null, [api])
  return use(iFetch)
}
