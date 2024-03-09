export interface UserLite {
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

export interface UserDetail extends UserLite {
  isAdmin: boolean
  isModerator: boolean
  isBot: boolean
  isCat: boolean
}

export type User = UserLite | UserDetail

export interface Note {
  id: string
  createdAt: string
  deletedAt: string | null
  text: string | null
  cw: string | null
  userId: string
  user: UserLite
  replyId: string | null
  renoteId: string | null
  reply: Note | null
  renote: Note | null
  isHidden: boolean
  visibility: "public" | "home" | "followers" | "specified"
  mentions: string[]
  visibleUserIds: string[]
  fileIds: string[]
  files: unknown[] // TODO
  tags: string[]
  poll: unknown | null // TODO
  emojis: unknown[] // TODO
  channelId: string | null
  channel: unknown | null // TODO
  localOnly: boolean
  reactionAcceptable: string | null
  reactionEmojis: unknown // TODO
  reactions: unknown // TODO
  renoteCount: number
  repliesCount: number
  uri: string
  url: string
  reactionAndUserPairCache: string[]
  clippedCount: number
  myReaction: string | null
}
