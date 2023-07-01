import { useAtom } from "jotai"
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
  const [streamConnect] = useAtom(streamConnectAtom)
  const [htlChannel] = useAtom(streamHTLChannelAtom)
  const [noteList, setNoteList] = useState<[{ note: any; index: number }]>()
  const [noteCount, setNoteCount] = useState(0)

  useEffect(() => {})

  htlChannel?.on("note", note => {
    console.log(note)
    setNoteCount(noteCount + 1)
    noteList?.push({ index: noteCount, note: note })
    setNoteList(noteList)
  })

  return (
    <div>
      {noteList?.map(n => {
        return <p key={n.index}>{n.note.text}</p> //なぜかこれが動かない
      })}
    </div>
  )
}
