import { Note } from "~/features/note"
import { User } from "~/features/user"

export type Notification = {
  id: string
  createdAt: string
  isRead: boolean
} & (
  | {
      type: "reaction"
      reaction: string
      user: User
      userId: User["id"]
      note: Note
    }
  | {
      type: "reply"
      user: User
      userId: User["id"]
      note: Note
    }
  | {
      type: "renote"
      user: User
      userId: User["id"]
      note: Note
    }
  | {
      type: "quote"
      user: User
      userId: User["id"]
      note: Note
    }
  | {
      type: "mention"
      user: User
      userId: User["id"]
      note: Note
    }
  | {
      type: "pollVote"
      user: User
      userId: User["id"]
      note: Note
    }
  | {
      type: "follow"
      user: User
      userId: User["id"]
    }
  | {
      type: "followRequestAccepted"
      user: User
      userId: User["id"]
    }
  | {
      type: "receiveFollowRequest"
      user: User
      userId: User["id"]
    }
  | {
      type: "groupInvited"
      // invitation: UserGroup
      user: User
      userId: User["id"]
    }
  | {
      type: "app"
      header?: string | null
      body: string
      icon?: string | null
    }
)
