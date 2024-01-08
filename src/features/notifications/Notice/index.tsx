import { Notification } from "misskey-js/built/entities"
import NoticeNotePreview from "./NoticeNotePreview"

export default function Notice({ notice }: { notice: Notification }) {
  return (
    <div className="p-3 border-t">
      {notice.type === "follow" ? (
        <FollowNotice notice={notice} />
      ) : notice.type === "mention" ? (
        <MentionNotice notice={notice} />
      ) : notice.type === "reply" ? (
        <ReplyNotice notice={notice} />
      ) : notice.type === "renote" ? (
        <RenoteNotice notice={notice} />
      ) : notice.type === "quote" ? (
        <QuoteNotice notice={notice} />
      ) : notice.type === "reaction" ? (
        <ReactionNotice notice={notice} />
      ) : notice.type === "pollVote" ? (
        <PollVoteNotice notice={notice} />
      ) : notice.type === "receiveFollowRequest" ? (
        <ReceiveFollowRequestNotice notice={notice} />
      ) : notice.type === "followRequestAccepted" ? (
        <FollowRequestAcceptedNotice notice={notice} />
      ) : notice.type === "groupInvited" ? (
        <GroupInvitedNotice notice={notice} />
      ) : notice.type === "app" ? (
        <AppNotice notice={notice} />
      ) : (
        <UnknownNotice notice={notice} />
      )}
    </div>
  )
}

export function FollowNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "follow") return null
  return <div>{notice.user.name}さんがフォローしました</div>
}

export function MentionNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "mention") return null
  return <div>{notice.user.name}さんからメンションが届きました</div>
}
export function ReplyNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "reply") return null
  return (
    <div>
      <span>{notice.user.name}さんから返信が届きました</span>
      <NoticeNotePreview note={notice.note} />
    </div>
  )
}

export function RenoteNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "renote") return null
  return <div>{notice.user.name}さんがリノートしました</div>
}

export function QuoteNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "quote") return null
  return <div>{notice.user.name}さんが引用リノートしました</div>
}

export function ReactionNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "reaction") return null
  return <div>{notice.user.name}さんがリアクションしました</div>
}

export function PollVoteNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "pollVote") return null
  return <div>{notice.user.name}さんが投票しました</div>
}

export function ReceiveFollowRequestNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "receiveFollowRequest") return null
  return <div>{notice.user.name}さんからフォローリクエストが届きました</div>
}

export function FollowRequestAcceptedNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "followRequestAccepted") return null
  return <div>{notice.user.name}さんがフォローリクエストを承認しました</div>
}

export function GroupInvitedNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "groupInvited") return null
  return <div>{notice.user.name}さんがグループに招待しました</div>
}

export function AppNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "app") return null
  return <div>{notice.id}</div>
}

export function UnknownNotice({ notice }: { notice: Notification }) {
  return (
    <div>
      {notice.type}は未実装です。通知ID: {notice.id}
    </div>
  )
}
