import { Notification, User } from "misskey-js/built/entities"

import Link from "next/link"
import { ReactNode } from "react"
import NoticeNotePreview from "./NoticeNotePreview"

import TimeText from "~/features/common/TimeText"
import { profileLink } from "~/features/profile"
import TLUserIcon from "~/features/profile/TLUserIcon"

export default function Notice({ notice }: { notice: Notification }) {
  return (
    <div className="flex justify-between border-t p-3">
      <NoticeContent notice={notice} />
      <span>
        <TimeText dateTime={notice.createdAt}></TimeText>
      </span>
    </div>
  )
}

export const NoticeUser = ({ user, children }: { user: User; children?: ReactNode }) => {
  return (
    <div className="flex gap-1.5">
      <TLUserIcon user={user} />
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex justify-between">
          <div className="flex gap-1 font-bold">
            <Link className="hover:underline" href={profileLink(user)}>
              {user.name}
            </Link>
            <p>
              <span>@{user.username}</span>
              <span className="text-neutral-400">@{user.host}</span>
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

const NoticeContent = ({ notice }: { notice: Notification }) => {
  return (
    <>
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
    </>
  )
}

export function FollowNotice({ notice }: { notice: Notification }) {
  if (notice.type !== "follow") return null
  return (
    <div>
      <NoticeUser user={notice.user}>あなたをフォローしました</NoticeUser>
    </div>
  )
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
  return (
    <div>
      <span> {notice.user.name}さんがリアクションしました</span>
      <NoticeNotePreview note={notice.note} />
    </div>
  )
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
