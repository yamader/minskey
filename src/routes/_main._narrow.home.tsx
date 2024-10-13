import BottomSpinner from "~/components/BottomSpinner"
import { useBottom } from "~/features/common"
import { Note } from "~/features/note"
import NotePreview from "~/features/note/NotePreview"
import { useTL } from "~/features/timeline"
import TLSwitch from "~/features/timeline/TLSwitch"

export default function HomePage() {
  const { notes, more } = useTL()
  useBottom(more)

  return (
    <>
      <TLSwitch className="sticky top-0 bg-white" />
      <div className="flex flex-col">
        {notes.map((note, i) => (
          <div className="border-t" key={i}>
            {/* Todo: 型アサーションをやめる */}
            <NotePreview note={note as Note} />
          </div>
        ))}
      </div>
      <BottomSpinner />
    </>
  )
}
