export * from "./types"

import { atom, useAtom } from "jotai"
import { Note as LegacyNote } from "misskey-js/built/entities"
import { use, useEffect, useState } from "react"
import { useAPI, useMisskeyJS } from "~/features/api"
import { Note } from "./types"

// todo: timeline cache
const localNoteCacheAtom = atom<{ [id: string]: Note | null }>({})

export function useLocalNote(noteId: string) {
  const api = useAPI()
  const [localNoteCache, setNoteCache] = useAtom(localNoteCacheAtom)

  if (noteId in localNoteCache) return localNoteCache[noteId]
  if (!api) return null

  const note = use(api.showNote(noteId))
  setNoteCache({ ...localNoteCache, [noteId]: note })

  return note
}

export function useNoteReplies(noteId: string) {
  const api = useAPI()
  const [replies, setReplies] = useState<Note[] | null>(null)

  useEffect(() => {
    if (!api || !noteId) return
    if (replies !== null) return

    api
      .noteReplies(noteId, { limit: 10 })
      .then(res => {
        setReplies(res)
      })
      .catch(() => {
        setReplies(null)
      })
  }, [replies, noteId, api])

  return replies
}

export function useRenotes(noteId: string) {
  const api = useMisskeyJS()
  const [renotes, setRenotes] = useState<LegacyNote[] | null>(null)

  useEffect(() => {
    if (!api || !noteId) return
    if (renotes !== null) return

    api
      .request("notes/renotes", {
        noteId: noteId,
        limit: 10,
      })
      .then(res => {
        setRenotes(res)
      })
      .catch(() => {
        setRenotes(null)
      })
  }, [renotes, noteId, api])

  return renotes
}
