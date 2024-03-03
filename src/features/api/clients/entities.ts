export type UserLite = {
  id: string
  name: string
  username: string
  host: string | null
  avatarUrl: string
  avatarBlurhash: string
  onlineStatus: "online" | "active" | "offline" | "unknown"
  emojis: {
    name: string
    url: string
  }[]
}

export type UserDetail = UserLite & {
  isAdmin: boolean
  isModerator: boolean
  isBot: boolean
  isCat: boolean
}

export type User = UserLite | UserDetail
