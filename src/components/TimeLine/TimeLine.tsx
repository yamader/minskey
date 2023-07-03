import { useAtom } from "jotai"
import { Note as NoteAPI } from "misskey-js/built/entities"
import { EventHandler, useState } from "react"
import { streamHTLChannelAtom } from "~/libs/atoms"
import { Note } from "./Note"

export function TimeLine() {
  //const [streamConnect] = useAtom(streamConnectAtom)
  const [htlChannel] = useAtom(streamHTLChannelAtom)
  const [noteList, setNoteList] = useState<NoteAPI[]>()
  const [currentTLType, changeTLType] = useState("home")

  const switchTLType = function(event: React.MouseEvent<HTMLInputElement>){
    changeTLType(event.currentTarget.value)
    console.log(currentTLType)
  }

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
            <input type="radio" name="timeline-switch" id="timeline-switch" value="Home" onClick={switchTLType}/>
            Home
          </label>
          <label>
            <input type="radio" name="timeline-switch" id="timeline-switch" value="Global" onClick={switchTLType}/>
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