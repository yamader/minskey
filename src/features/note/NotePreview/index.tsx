import { Home, Lock, Repeat2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import Mfm, { MfmSimple } from "react-mfm"
import TimeText from "~/components/TimeText"
import { useLogin } from "~/features/auth"
import { CustomEmojiCtx, CustomEmojiStr } from "~/features/common/CustomEmoji"
import FilePreview from "~/features/drive/FilePreview"
import { profileLink } from "~/features/user"
import { hostname } from "~/utils"
import { Note } from ".."
import NavMore from "./NavMore"
import NavRN from "./NavRN"
import NavReact from "./NavReact"
import NavReply from "./NavReply"

export default memo(NotePreview)

function NotePreview({ note, _nonav }: { note: Note; _nonav?: boolean }) {
  const account = useLogin()

  let renotebar = null
  let quoted = null
  if (note.renote) {
    if (!note.text && !note.files.length) {
      const host = note.user.host ?? account?.host ?? null
      renotebar = <RenoteBar note={note} host={host} />
      note = note.renote
    } else {
      quoted = <QuotedNote note={note.renote} />
    }
  }

  const _host = note.user.host ?? account?.host ?? null
  const host = _host && hostname(_host)

  return (
    <CustomEmojiCtx.Provider value={{ host }}>
      <div className="bg-white p-3">
        {renotebar}
        <div className="flex gap-1.5">
          {/* アイコン */}
          <Link
            className="m-1 h-fit w-fit overflow-hidden rounded-[48px] shadow transition-all hover:rounded-md"
            href={profileLink(note.user)}>
            <Image src={note.user.avatarUrl} width={48} height={48} alt="Icon" />
          </Link>

          <div className="flex w-full flex-col gap-0.5">
            {/* メタ情報 */}
            <div className="flex justify-between">
              <div className="flex gap-1 break-words font-bold">
                {/* ユーザー名 */}
                <Link className="mfm-plainCE hover:underline" href={profileLink(note.user)}>
                  <CustomEmojiStr text={note.user.name ?? "" /* wtf */} />
                </Link>
                {/* @ID@Host */}
                <p>
                  <span>@{note.user.username}</span>
                  <span className="text-neutral-400">@{host}</span>
                </p>
              </div>
              {/* 右寄せテキスト */}
              <div className="flex items-center">
                {/* 投稿日時 */}
                <Link className="hover:underline" href={`/note?id=${note.id}`}>
                  <TimeText dateTime={note.createdAt} />
                </Link>
                {/* スコープ */}
                {note.visibility == "home" ? (
                  <Home size={16} />
                ) : (
                  note.visibility == "followers" && <Lock size={16} />
                )}
              </div>
            </div>
            {/* 本文 */}
            {note.text && (
              <div>
                <Mfm text={note.text} />
              </div>
            )}
            {/* ファイル */}
            {!!note.files.length && (
              // todo: grid layout
              <div className="grid w-1/2 grid-cols-2">
                {note.files.map((file, i) => (
                  <div key={i}>
                    <FilePreview file={file} />
                  </div>
                ))}
              </div>
            )}
            {/* 引用 */}
            {quoted}
            {/* 操作 */}
            {!_nonav && (
              <div className="mt-1 flex gap-8">
                <NavReply note={note} />
                <NavRN note={note} />
                <NavReact note={note} />
                <NavMore note={note} />
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomEmojiCtx.Provider>
  )
}

function RenoteBar({ note, host }: { note: Note; host: string | null }) {
  return (
    <CustomEmojiCtx.Provider value={{ host }}>
      <div className="mb-1 flex justify-between text-neutral-600">
        <div className="ml-1 flex items-center gap-1 text-sm">
          <Repeat2 size={16} />
          <Link className="mfm-plainCE font-bold hover:underline" href={profileLink(note.user)}>
            <MfmSimple text={note.user.name ?? ""} />
          </Link>
          Renoted
        </div>
        <Link className="hover:underline" href={`/note?id=${note.id}`}>
          <TimeText dateTime={note.createdAt} />
        </Link>
      </div>
    </CustomEmojiCtx.Provider>
  )
}

function QuotedNote({ note }: { note: Note }) {
  return (
    <div className="overflow-hidden rounded border border-2 border-dashed">
      <NotePreview note={note} _nonav />
    </div>
  )
}
