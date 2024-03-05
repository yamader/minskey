import Image from "next/image"
import Link from "next/link"
import Anon from "~/assets/anon.png"
import { User } from "~/features/api/clients/entities"
import { profileLink } from "."

export function Icon({ src }: { src: string | null }) {
  return (
    <Image
      className="m-1 h-fit w-fit overflow-hidden rounded-[48px] shadow transition-all hover:rounded-md"
      src={src ?? Anon}
      width={48}
      height={48}
      alt="icon"
    />
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
