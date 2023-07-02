import { useAtom } from "jotai"
import { Note } from "misskey-js/built/entities"
import { useEffect, useState } from "react"

import CommonLayout from "~/components/CommonLayout"
import { streamConnectAtom, streamHTLChannelAtom } from "~/libs/atoms"

export default function IndexPage() {
  return (
    <CommonLayout>
      {/*<div className="my-16 rounded-[2rem] border bg-lime-500 py-32 text-white">
        <h1 className="text-center font-inter text-8xl font-black">minskey</h1>
      </div>*/}
      <TimeLine />
    </CommonLayout>
  )
}

function TimeLine() {
  //const [streamConnect] = useAtom(streamConnectAtom)
  const [htlChannel] = useAtom(streamHTLChannelAtom)
  const [noteList, setNoteList] = useState<{ note: Note; index: number }[]>()
  const [noteCount, setNoteCount] = useState(0)

  //useEffect(() => {})

  htlChannel?.on("note", note => {
    setNoteCount(noteCount + 1)
    if (note==null) return
    if (noteList==null){
      setNoteList([{note: note, index: 0}])
    }else{
      const newArray = [{ note: note, index: noteList.length }, ...noteList]
      setNoteList(newArray)
    }
  })

  return (
    <div>
      {noteList?.map(n => {
        return <div key={n.index}><Note note={n.note} /></div>
      })}
    </div>
  )
}

interface NoteProps{
  note: Note
}
// Todo: まともなTLのデザイン
function Note({note}: NoteProps){
  return (
    <div>
      <p>
        {note.user.name}「{note.text}」{note.files.length != 0 ? <>（{note.files.length}つのファイル）</> : <></>}
      </p>
    </div>
  )
}
