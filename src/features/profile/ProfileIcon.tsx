import { statusEmoji, useProfile } from "."
import UserIcon from "./UserIcon"

export default function ProfileIcon() {
  const profile = useProfile()

  // todo: SWRでステータスの更新

  return (
    <div className="relative h-12 w-12">
      <UserIcon src={profile?.avatarUrl} />
      <span className="absolute bottom-0 right-0 rounded-full bg-white leading-none">
        {statusEmoji(profile?.onlineStatus)}
      </span>
    </div>
  )
}
