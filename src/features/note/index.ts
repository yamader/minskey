export * from "./types"

import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { useAPI } from "~/features/api"
import { Note } from "."

// todo: timeline cache
const localNoteCacheSignal = signal<{ [id: string]: Note | null }>({})

export function useLocalNote(noteId: string) {
  const api = useAPI()
  const localNoteCache = localNoteCacheSignal.value

  useEffect(() => {
    if (!api || noteId in localNoteCache) return
    api.showNote(noteId).then(note => {
      localNoteCacheSignal.value = { ...localNoteCacheSignal.value, [noteId]: note }
    })
  }, [api, noteId, localNoteCache])

  return noteId in localNoteCache ? localNoteCache[noteId] : null
}

export function useNoteReplies(noteId: string) {
  const api = useAPI()
  const [replies, setReplies] = useState<Note[] | null>(null)

  useEffect(() => {
    if (!api) return
    api.noteReplies(noteId, { limit: 10 }).then(res => setReplies(res ?? null))
  }, [api, noteId])

  return replies
}

export function useRenotes(noteId: string) {
  const api = useAPI()
  const [renotes, setRenotes] = useState<Note[] | null>(null)

  useEffect(() => {
    if (!api) return
    api.noteRenotes(noteId, { limit: 10 }).then(res => setRenotes(res ?? null))
  }, [api, noteId])

  return renotes
}
