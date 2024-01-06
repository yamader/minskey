import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Endpoints } from "misskey-js"

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
