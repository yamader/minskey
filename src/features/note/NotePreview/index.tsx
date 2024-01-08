import { Repeat2 } from "lucide-react"
import { entities } from "misskey-js"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"

import NavMore from "./NavMore"
import NavReact from "./NavReact"
import NavReply from "./NavReply"
import NavRN from "./NavRN"
import { profileLink } from "~/features/profile"
import FilePreview from "~/features/drive/FilePreview"
import TimeText from "~/features/common/TimeText"

type NotePreviewProps = {
  note: entities.Note
  renote?: entities.Note
}

const NotePreviewMemo = memo(NotePreview)
export default NotePreviewMemo

// todo: 設定に応じて自動でリフレッシュ
function NotePreview({ note, renote }: NotePreviewProps) {
  if (note.renote && !note.text) {
    renote = note
    note = note.renote
  }

  return (
    <div className="p-3 rounded-xl bg-white shadow">
      {renote && (
        <div className="mb-1 flex justify-between text-neutral-600">
          <p className="ml-1 flex items-center gap-1 text-sm">
            <Repeat2 size={16} />
            <Link className="font-bold hover:underline" href={profileLink(renote.user)}>
              {renote.user.name}
            </Link>
          </p>
          <Link className="hover:underline" href={`/note?id=${renote.id}`}>
            <TimeText dateTime={renote.createdAt} />
          </Link>
        </div>
      )}
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
            <Link className="hover:underline" href={`/note?id=${note.id}`}>
              <TimeText dateTime={note.createdAt} />
            </Link>
          </div>
          <p>{note.text}</p>
          {!!note.files.length && (
            // todo: grid layout
            <div className="w-1/2 grid grid-cols-2">
              {note.files.map((file, i) => (
                <div key={i}>
                  <FilePreview file={file} />
                </div>
              ))}
            </div>
          )}
          <div className="mt-1 flex gap-8">
            <NavReply note={note} />
            <NavRN note={note} />
            <NavReact note={note} />
            <NavMore note={note} />
          </div>
        </div>
      </div>
    </div>
  )
}
