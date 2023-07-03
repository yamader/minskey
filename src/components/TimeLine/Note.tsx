import { Note } from "misskey-js/built/entities"
import { ReactNode } from "react"

interface NoteProps {
  note: Note
  renote?: Note
}
// Todo: まともなTLのデザイン
export function Note({ note, renote }: NoteProps): ReactNode {
  if (!note.text) {
    if (note.renote) {
      return Note({ note: note.renote, renote: note })
    }
  }

  return (
    <div className="m-4 p-2">
      {renote ? <p className="text-sm">Renoted by {renote.user.name} </p> : <></>}
      <div className="flex items-center">
        <img src={note.user.avatarUrl} alt="Icon" width={48} height={48} />
        <p className="pl-5">{note.user.name}</p>
      </div>
      <p className="">{note.text}</p>
      {note.files.length != 0 ? (
        <div className="flex ">
          {note.files.map(item => {
            if (item.type.startsWith("image/")) {
              return <img src={item.url} width={125} height={125} alt="File" key={item.id} />
            } else {
              return (
                <>
                  {item.url}({item.type})
                </>
              )
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
