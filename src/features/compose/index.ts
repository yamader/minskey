import { signal } from '@preact/signals'
import { persistedSignal } from '~/utils'

type Visibility = 'public' | 'home' | 'followers' | 'specified' | undefined

const noteDialogSignal = signal(false)
const noteLastVisibilitySignal = persistedSignal<Visibility>('minsk::note::visibility', 'public')

export function useComposeNoteDialog() {
  const setNoteDialog = (v: boolean) => {
    noteDialogSignal.value = v
  }
  return [noteDialogSignal.value, setNoteDialog] as const
}

export function useComposeNoteLastVisibility() {
  const setVisibility = (v: Visibility) => {
    noteLastVisibilitySignal.value = v
  }
  return [noteLastVisibilitySignal.value, setVisibility] as const
}
