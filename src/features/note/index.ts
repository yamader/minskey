import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Endpoints } from "misskey-js"
import { Note } from "misskey-js/built/entities"
import { useEffect, useState } from "react"
import { useAPI } from "../api"

// atoms

const noteDialogAtom = atom(false)

const pictureDialogAtom = atom<{ open: boolean; file: string }>({ open: false, file: "" })

type Visibility = Endpoints["notes/create"]["req"]["visibility"]
const noteVisibilityAtom = atomWithStorage<Visibility>("minsk::note::visibility", "public")

// hooks

export function useNoteDialog() {
  return useAtom(noteDialogAtom)
}

export function usePictureDialog() {
  return useAtom(pictureDialogAtom)
}

export function useNoteVisibility() {
  return useAtom(noteVisibilityAtom)
}

export function useNote(noteId: string) {
  const api = useAPI()
  const [note, setNote] = useState<Note | null | "error">(null)

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
  return note
}
export function useNoteReplies(noteId: string) {
  const api = useAPI()
  const [replies, setReplies] = useState<Note[] | null>(null)

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

  return replies
}

export function useRenotes(noteId: string) {
  const api = useAPI()
  const [renotes, setRenotes] = useState<Note[] | null>(null)

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
