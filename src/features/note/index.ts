export * from "./types"

import { atom, useAtom } from "jotai"
import { use } from "react"
import { useAPI } from "~/features/api"
import { Note } from "."

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
  if (!api) return []
  return use(api.noteReplies(noteId, { limit: 10 })) ?? []
}

export function useRenotes(noteId: string) {
  const api = useAPI()
  if (!api) return []
  return use(api.noteRenotes(noteId, { limit: 10 })) ?? []
}
