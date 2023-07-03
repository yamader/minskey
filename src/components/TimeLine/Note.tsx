import { Note } from "misskey-js/built/entities"

interface NoteProps {
  note: Note
}
// Todo: まともなTLのデザイン
export function Note({ note }: NoteProps) {
  return (
    <div>
      <p>
        {note.text ? (
          <>
            {note.user.name}「{note.text}」{note.files.length != 0 ? <>（{note.files.length}つのファイル）</> : <></>}
          </>
        ) : (
          <></>
        )}
      </p>
    </div>
  )
}
