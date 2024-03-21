import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Endpoints } from "misskey-js"
import { Note as LegacyNote } from "misskey-js/built/entities"
import { useEffect, useState } from "react"
import { useAPI, useMisskeyJS } from "~/features/api"
import * as entities from "~/features/api/clients/entities"

// atoms

const noteDialogAtom = atom(false)

type Visibility = Endpoints["notes/create"]["req"]["visibility"]
const noteVisibilityAtom = atomWithStorage<Visibility>("minsk::note::visibility", "public")

// hooks

export function useNoteDialog() {
  return useAtom(noteDialogAtom)
}

export function useNoteVisibility() {
  return useAtom(noteVisibilityAtom)
}

export function useNote(noteId: string) {
  const api = useAPI()
  const [note, setNote] = useState<entities.Note | null | "error">(null)

  // Set note
  useEffect(() => {
    if (!api || !noteId) return
    if (note !== null) return

    api
      .showNote(noteId)
      .then(res => {
        setNote(res ?? null)
      })
      .catch(() => {
        setNote("error")
      })
  }, [note, noteId, api])
  return note
}
export function useNoteReplies(noteId: string) {
  const api = useAPI()
  const [replies, setReplies] = useState<entities.Note[] | null>(null)

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
