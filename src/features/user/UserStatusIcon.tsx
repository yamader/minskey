import { User, statusEmoji } from "."
import UserIcon from "./UserIcon"

export default function UesrStatusIcon({ user }: { user: User | null }) {
  return (
    <div className="relative">
      <UserIcon user={user} />
      <span className="absolute -bottom-0.5 -right-0.5 cursor-default text-sm leading-none">
        {statusEmoji(user?.onlineStatus)}
      </span>
    </div>
  )
}
