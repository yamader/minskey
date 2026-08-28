import { Settings as SettingsIcon } from 'lucide-preact'
import { useState } from 'preact/hooks'
import BottomSpinner from '~/components/BottomSpinner'
import Popover from '~/components/Popover'
import { useBottom } from '~/features/common'
import { Note } from '~/features/note'
import NotePreview from '~/features/note/NotePreview'
import { HomeDisplay, useSettings } from '~/features/settings'
import { setHomeDisplay, useHomeDisplay, useTL } from '~/features/timeline'
import { useListTimeline, useLists } from '~/features/user-list'

const fixedPins: HomeDisplay[] = ['homeTimeline', 'localTimeline', 'globalTimeline']

function tlLabel(pin: HomeDisplay) {
  if (pin === 'homeTimeline') return 'HTL'
  if (pin === 'localTimeline') return 'LTL'
  return 'GTL'
}

export default function HomePage() {
  const [settings, setSettings] = useSettings()
  const { lists } = useLists()
  const display = useHomeDisplay()
  const [pinsOpen, setPinsOpen] = useState(false)

  const pins = settings.ui.homePins
  const isList = display.startsWith('list:')

  const listPins: HomeDisplay[] = (lists ?? []).map(list => `list:${list.id}` as HomeDisplay)

  const allPins = [...fixedPins, ...listPins]

  const pinLabel = (pin: HomeDisplay) =>
    pin.startsWith('list:') ? ((lists ?? []).find(l => `list:${l.id}` === pin)?.name ?? 'リスト') : tlLabel(pin)

  const togglePin = (pin: HomeDisplay) => {
    const next = pins.includes(pin) ? pins.filter(p => p !== pin) : [...pins, pin]
    setSettings({ ...settings, ui: { ...settings.ui, homePins: next } })
  }

  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-white">
        <div className="flex items-center">
          {pins.map(pin => (
            <button
              key={pin}
              type="button"
              className={'grow py-2 text-center ' + (pin === display ? 'underline' : '')}
              onClick={() => setHomeDisplay(pin)}>
              {pinLabel(pin)}
            </button>
          ))}
          <Popover
            open={pinsOpen}
            onOpenChange={setPinsOpen}
            trigger={<SettingsIcon size={18} className="m-2 text-neutral-600" />}
            contentClassName="absolute right-0 z-50 mt-1 w-72 rounded-lg border bg-white p-2 shadow-lg">
            <p className="px-1 pb-1 font-bold text-sm">バーに固定するTLを選択</p>
            {allPins.map(pin => (
              <label key={pin} className="flex items-center gap-2 rounded px-1 py-1 text-sm hover:bg-neutral-100">
                <input type="checkbox" checked={pins.includes(pin)} onChange={() => togglePin(pin)} />
                <span>{pinLabel(pin)}</span>
              </label>
            ))}
          </Popover>
        </div>
      </div>
      {isList ? <ListNotes key={display} listId={display.slice(5)} /> : <HomeNotes />}
      <BottomSpinner />
    </>
  )
}

function HomeNotes() {
  const { notes, more } = useTL()
  useBottom(more)

  return (
    <div className="flex flex-col">
      {notes.map(note => (
        <div className="border-t" key={note.id}>
          {/* Todo: 型アサーションをやめる */}
          <NotePreview note={note as Note} />
        </div>
      ))}
    </div>
  )
}

function ListNotes({ listId }: { listId: string }) {
  const { notes, more } = useListTimeline(listId)
  useBottom(more)

  return (
    <div className="flex flex-col gap-px bg-gray-200 py-px">
      {notes.map(note => (
        <NotePreview note={note} key={note.id} />
      ))}
    </div>
  )
}
