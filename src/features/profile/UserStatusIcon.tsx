import { statusEmoji, useProfile } from "."
import UserIcon from "./UserIcon"

export default function UesrStatusIcon() {
  const profile = useProfile()

  return (
    <div className="relative h-12 w-12">
      <UserIcon user={profile} />
      <span className="absolute bottom-0 right-0 rounded-full bg-white leading-none">
        {statusEmoji(profile?.onlineStatus)}
      </span>
    </div>
  )
}
