import { Link } from "react-router"
import Anon from "~/assets/anon.png"
import { User, profileLink } from "."

export function Icon({ src }: { src: string | null }) {
  return (
    // todo: grow
    <div className="h-10 w-10 overflow-hidden rounded-[100%] border transition-all hover:rounded">
      <img className="h-full w-full object-cover" src={src ?? Anon} alt="user icon" />
    </div>
  )
}

export default function UserIcon({ user }: { user: User | null }) {
  return !user ? (
    <Icon src={null} />
  ) : (
    <Link to={profileLink(user)}>
      <Icon src={user.avatarUrl} />
    </Link>
  )
}
