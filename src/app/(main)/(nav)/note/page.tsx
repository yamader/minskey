"use client"

import { Note } from "misskey-js/built/entities"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useAPI } from "~/features/api"
import NotePreview from "~/features/note/NotePreview"

export default function NotePage() {
  const params = useSearchParams()
  const noteId = params.get("id")
  const api = useAPI()

  const [note, setNote] = useState<Note | null | "error">(null)
  const [replies, setReplies] = useState<Note[] | null>(null)

  // Set note
  useEffect(() => {
    if (!api || !noteId) return
    if (note !== null) return

    api
      .request("notes/show", {
        noteId: noteId,
      })
      .then(res => {
        setNote(res)
      })
      .catch(() => {
        setNote("error")
      })
  }, [note, noteId, api])

  // Set replies
  useEffect(() => {
    if (!api || !noteId) return
    if (replies !== null) return

    api
      .request("notes/replies", {
        noteId: noteId,
        limit: 10,
      })
      .then(res => {
        setReplies(res)
      })
      .catch(() => {
        setReplies(null)
      })
  }, [replies, noteId, api])

  if (!note) {
    //console.log("render loading")
    return <div>Loading...</div>
  }
  if (note === "error") {
    //console.log("render error")
    return <div>Error</div>
  }

  //console.log("render note")
  console.log(replies)
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
