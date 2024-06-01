import { Emoji } from "~/features/common"
import { DriveFile } from "~/features/drive"
import { User } from "~/features/user"

export type Note = {
  id: string
  createdAt: string
  deletedAt: string | null
  text: string | null
  cw: string | null
  userId: string
  user: User
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
