"use client"

import { useState } from "react"

import NotePreview from "~/components/NotePreview"
import { useTL } from "~/features/timeline/libs"
import { useBottom } from "~/libs/utils"

// todo: TLの切り替え
export default function HomePage() {
  const { notes, more } = useTL("homeTimeline")
  const [loadingMore, setLoadingMore] = useState(false)

  useBottom(() => {
    setLoadingMore(true)
    more().then(() => setLoadingMore(false))
  })

  return (
    <div>
      {notes.map((note, i) => (
        <NotePreview note={note} key={i} />
      ))}
      {loadingMore && <div>loading...</div>}
    </div>
  )
}
