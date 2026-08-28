import { signal } from '@preact/signals'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useAPI, useChannel } from '~/features/api'
import { Note } from '~/features/note'
import { HomeDisplay } from '~/features/settings'
import { TLNames } from '~/features/timeline'
import { UserList } from '~/features/user-list'
import { persistedSignal } from '~/utils'

const deckNavCollapsedSignal = persistedSignal<boolean>('minsk::deck::nav-collapsed', false)
const deckComposeOpenSignal = persistedSignal<boolean>('minsk::deck::compose-open', false)

export type OpenDeckWindow = { sub: string; url: string }

// 開いているウィンドウ(末尾がアクティブ)をアクティブなURLと同期する
const openWindowsSignal = signal<OpenDeckWindow[]>([])

export function useOpenDeckWindows(): OpenDeckWindow[] {
  return openWindowsSignal.value
}

export function syncDeckWindows(url: string) {
  const sub = url.split('?')[0].split('/')[2]
  if (!sub) return
  const list = openWindowsSignal.value
  const idx = list.findIndex(w => w.sub === sub)
  if (idx === -1) openWindowsSignal.value = [...list, { sub, url }]
  else if (idx !== list.length - 1)
    openWindowsSignal.value = [...list.filter(w => w.sub !== sub), { ...list[idx], url }]
  else if (list[idx].url !== url) openWindowsSignal.value = [...list.slice(0, idx), { ...list[idx], url }]
}

// 閉じたあとのアクティブなURL(無ければnull)を返す
export function closeDeckWindow(sub: string): string | null {
  const next = openWindowsSignal.value.filter(w => w.sub !== sub)
  openWindowsSignal.value = next
  return next.length ? next[next.length - 1].url : null
}

export function useDeckNavCollapsed() {
  return [
    deckNavCollapsedSignal.value,
    (v: boolean) => {
      deckNavCollapsedSignal.value = v
    },
  ] as const
}

export function useDeckComposeOpen() {
  return [
    deckComposeOpenSignal.value,
    (v: boolean) => {
      deckComposeOpenSignal.value = v
    },
  ] as const
}

export function deckLabel(display: HomeDisplay, lists: UserList[]) {
  if (display.startsWith('list:')) return lists.find(list => `list:${list.id}` === display)?.name ?? 'リスト'
  return display === 'homeTimeline' ? 'HTL' : display === 'localTimeline' ? 'LTL' : 'GTL'
}

// リストと通常TLの両方を扱うカラム用ストリーム
export function useDeckStream(display: HomeDisplay) {
  const api = useAPI()
  const isList = display.startsWith('list:')
  const listId = isList ? display.slice(5) : ''
  const chan = useChannel(isList ? 'userList' : (display as TLNames), isList ? { listId } : {})
  const [notes, setNotes] = useState<Note[]>([])
  const untilRef = useRef('')
  const busyRef = useRef(false)

  useEffect(() => {
    if (!api) return
    untilRef.current = ''
    busyRef.current = false
    setNotes([])
    const res = isList ? api.listTimeline(listId, { limit: 20 }) : api.notes(display as TLNames, { limit: 20 })
    res.then(r => {
      if (r?.length) {
        setNotes(r)
        untilRef.current = r[r.length - 1].id
      }
    })
  }, [api, display, isList, listId])

  useEffect(() => {
    chan?.on('note', note => setNotes(notes => [note, ...notes]))
  }, [chan])

  const more = useCallback(async () => {
    if (!api || busyRef.current) return
    busyRef.current = true
    const opts = { limit: 30, untilId: untilRef.current }
    const res = isList ? await api.listTimeline(listId, opts) : await api.notes(display as TLNames, opts)
    if (res?.length) {
      setNotes(notes => notes.concat(res))
      untilRef.current = res[res.length - 1].id
    }
    busyRef.current = false
  }, [api, display, isList, listId])

  return { notes, more }
}

// カラム内スクロールでの無限ロード
export function useColumnBottom(f: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) f()
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    return () => el.removeEventListener('scroll', check)
  })
  return ref
}
