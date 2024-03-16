"use client"

import BottomSpinner from "~/components/BottomSpinner"
import { useBottom } from "~/features/common"
import NotePreview from "~/features/note/NotePreview"
import { useTL } from "~/features/timeline"
import TLSwitch from "~/features/timeline/TLSwitch"

export default function HomePage() {
  const { notes, more } = useTL()
  useBottom(more)

  return (
    <>
      <TLSwitch className="bg-white sticky top-0" />
      <div className="flex flex-col">
        {notes.map((note, i) => (
          <div className="border-t" key={i}>
            <NotePreview note={note} />
          </div>
        ))}
      </div>
      <BottomSpinner />
    </>
  )
}
