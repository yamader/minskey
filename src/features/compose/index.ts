import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Visibility = "public" | "home" | "followers" | "specified" | undefined

const noteDialogAtom = atom(false)
const noteLastVisibilityAtom = atomWithStorage<Visibility>("minsk::note::visibility", "public")

export function useComposeNoteDialog() {
  return useAtom(noteDialogAtom)
}

export function useComposeNoteLastVisibility() {
  return useAtom(noteLastVisibilityAtom)
}
