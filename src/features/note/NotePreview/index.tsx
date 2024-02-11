import { Repeat2 } from "lucide-react"
import { entities } from "misskey-js"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import Mfm, { MfmSimple } from "react-mfm"
import TimeText from "~/features/common/TimeText"
import FilePreview from "~/features/drive/FilePreview"
import { CustomEmojiCtx } from "~/features/mfm/CustomEmoji"
import { profileLink } from "~/features/profile"
import NavMore from "./NavMore"
import NavRN from "./NavRN"
import NavReact from "./NavReact"
import NavReply from "./NavReply"

type NotePreviewProps = {
  note: entities.Note
  renote?: entities.Note
  //asReply?: boolean
}

// なんかいい感じにできねーかな
function NotePreviewWithHost(props: NotePreviewProps) {
  return (
    <CustomEmojiCtx.Provider value={{ host: props.note.user.host }}>
      <NotePreview {...props} />
    </CustomEmojiCtx.Provider>
  )
}

export default memo(NotePreviewWithHost)

// todo: 設定に応じて自動でリフレッシュ
function NotePreview({ note, renote }: NotePreviewProps) {
  if (note.renote && !note.text) {
    renote = note
    note = note.renote
  }

  return (
    <div className="p-3 rounded-xl bg-white shadow">
      {renote && <RenoteBar renote={renote} />}
      <div className="flex gap-1.5">
        <Link
          className="m-1 h-fit w-fit overflow-hidden rounded-[48px] shadow transition-all hover:rounded-md"
          href={profileLink(note.user)}>
          <Image src={note.user.avatarUrl} width={48} height={48} alt="Icon" />
        </Link>
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex justify-between">
            <div className="flex gap-1 font-bold">
              <Link className="mfm-plainCE hover:underline" href={profileLink(note.user)}>
                <MfmSimple text={note.user.name ?? "" /* wtf */} />
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
          {note.text && (
            <p>
              <Mfm text={note.text} />
            </p>
          )}
          {!!note.files.length && (
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

function RenoteBar({ renote }: { renote: entities.Note }) {
  return (
    <CustomEmojiCtx.Provider value={{ host: renote.user.host }}>
      <div className="mb-1 flex justify-between text-neutral-600">
        <p className="ml-1 flex items-center gap-1 text-sm">
          <Repeat2 size={16} />
          <Link className="mfm-plainCE font-bold hover:underline" href={profileLink(renote.user)}>
            <MfmSimple text={renote.user.name} />
          </Link>
        </p>
        <Link className="hover:underline" href={`/note?id=${renote.id}`}>
          <TimeText dateTime={renote.createdAt} />
        </Link>
      </div>
    </CustomEmojiCtx.Provider>
  )
}
