import { DriveFile } from "misskey-js/built/entities" // TODO: やめる

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
  reply?: Note
  replyId: string | null
  renote?: Note | null
  renoteId: string | null
  isHidden: boolean
  visibility: "public" | "home" | "followers" | "specified"
  mentions: string[]
  visibleUserIds: string[]
  fileIds: string[]
  files: DriveFile[] // TODO
  tags: string[]
  poll: unknown | null // TODO
  emojis: Emoji[]
  channelId: string | null
  channel: unknown | null // TODO
  localOnly: boolean
  reactionAcceptable: string | null
  reactionEmojis: unknown // TODO
  reactions: unknown // TODO
  renoteCount: number
  repliesCount: number
  uri?: string
  url?: string
  reactionAndUserPairCache: string[]
  clippedCount: number
  myReaction: string | null
}

export type Emoji = {
  name: string
  url: string
}
