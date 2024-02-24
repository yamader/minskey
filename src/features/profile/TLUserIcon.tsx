import { entities } from "misskey-js"
import Image from "next/image"
import Link from "next/link"
import { profileLink } from "."

export default function TLUserIcon({ user }: { user: entities.User }) {
  return (
    <Link
      className="m-1 h-fit w-fit overflow-hidden rounded-[48px] shadow transition-all hover:rounded-md"
      href={profileLink(user)}>
      <Image src={user.avatarUrl} width={48} height={48} alt="Icon" />
    </Link>
  )
}
