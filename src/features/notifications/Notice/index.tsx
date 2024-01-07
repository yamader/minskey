import { Notification } from "misskey-js/built/entities"

export default function Notice({ notice }: { notice: Notification }) {
  switch (notice.type) {
    case "follow":
      return <FollowNotice notice={notice} />
    case "mention":
      return <MentionNotice notice={notice} />

    case "reply":
      return <ReplyNotice notice={notice} />
    case "renote":
      return <RenoteNotice notice={notice} />
    case "quote":
      return <QuoteNotice notice={notice} />
    case "reaction":
      return <ReactionNotice notice={notice} />
    case "pollVote":
      return <PollVoteNotice notice={notice} />
    case "receiveFollowRequest":
      return <ReceiveFollowRequestNotice notice={notice} />
    case "followRequestAccepted":
      return <FollowRequestAcceptedNotice notice={notice} />
    case "groupInvited":
      return <GroupInvitedNotice notice={notice} />
    case "app":
      return <AppNotice notice={notice} />
    default:
      return <UnknownNotice notice={notice} />
  }
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
  return <div>{notice.user.name}さんから返信が届きました</div>
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
