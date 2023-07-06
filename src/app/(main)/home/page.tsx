"use client"

import NotePreview from "~/components/NotePreview"
import { useTL } from "~/features/timeline/libs"

// todo: TLの切り替え
export default function HomePage() {
  const { notes } = useTL("homeTimeline")

  return (
    <div>
      {notes.map(note => (
        <NotePreview note={note} key={note.id} />
      ))}
    </div>
  )
}
