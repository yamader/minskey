import { MoreHorizontal, Plus, Repeat2, Reply } from "lucide-react"
import { entities } from "misskey-js"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"

import FilePreview from "~/components/FilePreview"
import { profileLink } from "~/features/profile/libs"
import { reltime } from "~/libs/utils"

type NotePreviewProps = {
  note: entities.Note
  renote?: entities.Note
}

const NotePreviewMemo = memo<NotePreviewProps>(function NP({ note }) {
  return <NotePreview note={note} />
})

export default NotePreviewMemo

// Todo: まともなTLのデザイン
function NotePreview({ note, renote }: NotePreviewProps) {
  if (note.renote && !note.text) {
    return <NotePreview note={note.renote} renote={note} />
  }

  return (
    <div className="p-3">
      {renote && <RenoteHeader rn={renote} />}
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
            <p>{reltime(note.createdAt)}</p>
          </div>
          <p>{note.text}</p>
          {!!note.files.length && (
            // todo: grid layout
            <div className="">
              {note.files.map((file, i) => (
                <div key={i}>
                  <FilePreview file={file} />
                </div>
              ))}
            </div>
          )}
          <div className="mt-1 flex gap-8">
            <Reply size={20} />
            <Repeat2 size={20} />
            <Plus size={20} />
            <MoreHorizontal size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

function RenoteHeader({ rn }: { rn: entities.Note }) {
  return (
    <div className="mb-1 flex justify-between text-neutral-600">
      <p className="ml-1 flex items-center gap-1 text-sm">
        <Repeat2 size={16} />
        <Link className="font-bold hover:underline" href={profileLink(rn.user)}>
          {rn.user.name}
        </Link>
      </p>
      <p>{reltime(rn.createdAt)}</p>
    </div>
  )
}
