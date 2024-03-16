import Link from "next/link"
import Anon from "~/assets/anon.png"
import { User } from "~/features/api/clients/entities"
import { profileLink } from "."

export function Icon({ src }: { src: string | null }) {
  return (
    // todo: grow
    <div className="h-10 w-10 overflow-hidden rounded-[100%] border transition-all hover:rounded">
      <img className="h-full w-full object-cover" src={src ?? Anon.src} alt="user icon" />
    </div>
  )
}

export default function UserIcon({ user }: { user: User | null }) {
  return !user ? (
    <Icon src={null} />
  ) : (
    <Link href={profileLink(user)} passHref>
      <Icon src={user.avatarUrl} />
    </Link>
  )
}
