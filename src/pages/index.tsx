import { useAtom } from "jotai"
import { Note } from "misskey-js/built/entities"
import { useState } from "react"

import CommonLayout from "~/components/CommonLayout"
import { streamHTLChannelAtom } from "~/libs/atoms"

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
  const [noteList, setNoteList] = useState<Note[]>()

  htlChannel?.on("note", note => {
    if (note == null) return
    if (noteList == null) {
      setNoteList([note])
    } else {
      setNoteList([note, ...noteList])
    }
  })

  return (
    <div>
      <div>
        {/* タイムラインの切り替えをいつか実装したいけど、どうやればいいかわからない */}
        <form onChange={undefined} style={{ display: "none" }}>
          <label>
            <input type="radio" name="timeline-switch" id="timeline-switch" value="Home" />
            Home
          </label>
          <label>
            <input type="radio" name="timeline-switch" id="timeline-switch" value="Global" />
            Global
          </label>
        </form>
      </div>
      <div>
        {htlChannel ? (
          <>
            {noteList?.map(n => {
              return (
                <div key={n.id}>
                  <Note note={n} />
                </div>
              )
            })}
          </>
        ) : (
          <p>Please login at first</p>
        )}
      </div>
    </div>
  )
}

interface NoteProps {
  note: Note
}
// Todo: まともなTLのデザイン
function Note({ note }: NoteProps) {
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
