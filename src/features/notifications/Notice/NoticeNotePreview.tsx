import { entities } from "misskey-js"
import Image from "next/image"
import Link from "next/link"
import { profileLink } from "~/features/profile"

export default function NoticeNotePreview({ note }: { note: entities.Note }) {
  return (
    <div className="p-3">
      <div className="flex gap-1.5">
        <Link
          className="m-1 h-fit w-fit overflow-hidden rounded-[48px] shadow transition-all hover:rounded-md"
          href={profileLink(note.user)}>
          <Image src={note.user.avatarUrl} width={48} height={48} alt="Icon" />
        </Link>
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex justify-between">
            <div className="flex gap-1 font-bold">
              <Link className="hover:underline" href={profileLink(note.user)}>
                {note.user.name}
              </Link>
              <p>
                <span>@{note.user.username}</span>
                <span className="text-neutral-400">@{note.user.host}</span>
              </p>
            </div>
          </div>
          <p>
            <Link className="hover:underline" href={`/note?id=${note.id}`}>
              {note.text}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
