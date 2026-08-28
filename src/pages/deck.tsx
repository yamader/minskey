import { Plus, X } from 'lucide-preact'
import { ComponentChild } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Popover from '~/components/Popover'
import {
  closeDeckWindow,
  deckLabel,
  syncDeckWindows,
  useColumnBottom,
  useDeckStream,
  useOpenDeckWindows,
} from '~/features/deck'
import ComposePane from '~/features/deck/ComposePane'
import DeckNav from '~/features/deck/DeckNav'
import NotePreview from '~/features/note/NotePreview'
import { useNotificationsStream } from '~/features/notification'
import { HomeDisplay, useSettings } from '~/features/settings'
import { useTLStream } from '~/features/timeline'
import { UserList, useLists } from '~/features/user-list'
import Window from '~/features/window/Window'
import HomePage from '~/pages/home'
import ListsPage from '~/pages/lists'
import NotificationsPage from '~/pages/notifications'
import ProfilePage from '~/pages/profile'
import SettingsPage from '~/pages/settings'
import { usePathname, useRouter, useURL } from '~/router'

const fixedPins: HomeDisplay[] = ['homeTimeline', 'localTimeline', 'globalTimeline']

// デッキ内ウィンドウに表示するページ
const pages: Record<string, () => ComponentChild> = {
  home: () => <HomePage />,
  notifications: () => <NotificationsPage />,
  lists: () => <ListsPage />,
  settings: () => <SettingsPage />,
  profile: () => <ProfilePage />,
}

export default function DeckPage() {
  const [settings, setSettings] = useSettings()
  const { lists } = useLists()
  const deck = settings.ui.deck
  const url = useURL()
  const pathname = usePathname()
  const openWindows = useOpenDeckWindows()

  useTLStream()
  useNotificationsStream()

  // URL(アクティブなウィンドウ)と開いているウィンドウのリストを同期する
  useEffect(() => {
    const sub = pathname.split('/')[2]
    if (sub && pages[sub]) syncDeckWindows(url)
  }, [url, pathname])

  const setDeck = (next: HomeDisplay[]) => setSettings({ ...settings, ui: { ...settings.ui, deck: next } })
  const add = (display: HomeDisplay) => setDeck(deck.includes(display) ? deck : [...deck, display])
  const remove = (display: HomeDisplay) => setDeck(deck.filter(d => d !== display))

  return (
    <div className="flex h-screen">
      <DeckNav />
      <ComposePane />
      <div className="relative flex grow bg-neutral-100">
        <div className="flex grow items-stretch gap-2 overflow-x-auto p-2">
          {deck.map(display => (
            <DeckColumn key={display} display={display} lists={lists ?? []} onRemove={() => remove(display)} />
          ))}
          <div className="flex h-full flex-none flex-col justify-center">
            <AddColumnMenu lists={lists ?? []} onAdd={add} />
          </div>
        </div>
        {openWindows.map(w => (pages[w.sub] ? <PageWindow key={w.sub} sub={w.sub} /> : null))}
      </div>
    </div>
  )
}

// デッキ内ウィンドウは共通の Window コンポーネントを使う
function PageWindow({ sub }: { sub: string }) {
  const router = useRouter()
  const url = useURL()
  const windows = useOpenDeckWindows()
  const w = windows.find(x => x.sub === sub)
  const view = pages[sub]
  if (!w || !view) return null

  // クリックでそのウィンドウをアクティブ(=URLをそのウィンドウに合わせる)にする
  const activate = () => {
    if (w.url !== url) router.push(w.url)
  }
  const close = () => {
    const next = closeDeckWindow(sub)
    if (next && next !== url) router.push(next)
    else if (!next) router.push('/deck')
  }

  return (
    <div onMouseDownCapture={activate}>
      <Window onClose={close}>{view()}</Window>
    </div>
  )
}

function DeckColumn({ display, lists, onRemove }: { display: HomeDisplay; lists: UserList[]; onRemove: () => void }) {
  const { notes, more } = useDeckStream(display)
  const scrollRef = useColumnBottom(more)

  return (
    <div className="flex h-full w-96 flex-none flex-col overflow-hidden rounded-xl border bg-white shadow">
      <header className="flex shrink-0 items-center justify-between border-b px-3 py-2">
        <span className="font-bold text-sm">{deckLabel(display, lists)}</span>
        <button
          type="button"
          className="rounded p-1 text-neutral-500 hover:bg-neutral-100"
          title="カラムを削除"
          onClick={onRemove}>
          <X size={16} />
        </button>
      </header>
      <div ref={scrollRef} className="overflow-y-auto">
        {notes.map(note => (
          <NotePreview note={note} key={note.id} />
        ))}
      </div>
    </div>
  )
}

function AddColumnMenu({ lists, onAdd }: { lists: UserList[]; onAdd: (display: HomeDisplay) => void }) {
  const [open, setOpen] = useState(false)
  const options: HomeDisplay[] = [...fixedPins, ...lists.map(list => `list:${list.id}` as HomeDisplay)]

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <div className="rounded-xl border border-dashed p-3 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
          <Plus size={24} />
        </div>
      }
      contentClassName="absolute right-0 z-50 mt-1 w-56 rounded-lg border bg-white p-2 shadow-lg">
      {options.map(display => (
        <button
          key={display}
          type="button"
          className="flex w-full items-center rounded px-2 py-1 text-left text-sm hover:bg-neutral-100"
          onClick={() => {
            onAdd(display)
            setOpen(false)
          }}>
          {deckLabel(display, lists)}
        </button>
      ))}
    </Popover>
  )
}
