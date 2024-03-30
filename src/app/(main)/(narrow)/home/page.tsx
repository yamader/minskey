"use client"

import BottomSpinner from "~/components/BottomSpinner"
import * as entities from "~/features/api/clients/entities"
import { useBottom } from "~/features/common"
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
            <NotePreview note={note as entities.Note} />
          </div>
        ))}
      </div>
      <BottomSpinner />
    </>
  )
}
