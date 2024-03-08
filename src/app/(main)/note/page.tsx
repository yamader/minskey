"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useNote, useNoteReplies } from "~/features/note"
import NotePreview from "~/features/note/NotePreview"

export default function NotePage() {
  return (
    <Suspense>
      <NoteSuspense />
    </Suspense>
  )
}

function NoteSuspense() {
  const params = useSearchParams()
  let noteId = params.get("id")
  if (!noteId) noteId = ""

  const note = useNote(noteId)
  const replies = useNoteReplies(noteId)

  if (!note) {
    return <div>Loading...</div>
  }

  if (note === "error") {
    return <div>Error</div>
  }

  return (
    <>
      <NotePreview note={note} />

      {replies !== null ?? <h2>Replies</h2>}
      {replies?.map(reply => (
        <div key={reply.id}>
          <NotePreview note={reply} />
        </div>
      ))}
    </>
  )
}
