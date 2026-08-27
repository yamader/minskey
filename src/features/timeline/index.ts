export type TLNames = "homeTimeline" | "localTimeline" | "hybridTimeline" | "globalTimeline"

import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { useAPI, useChannel } from "~/features/api"
import { Note } from "~/features/note"
import { HomeDisplay, useSettings } from "~/features/settings"

//------------------------------------------------------------//
//  signals
//------------------------------------------------------------//

const tlNotesSignal = signal<Note[]>([])
const tlMoreSignal = signal<[() => void]>([() => {}])
const homeDisplaySignal = signal<HomeDisplay>("homeTimeline")

export function setHomeDisplay(display: HomeDisplay) {
  homeDisplaySignal.value = display
}

// アクティブな表示がピン留めから外れていたら先頭のピンにフォールバック
export function useHomeDisplay(): HomeDisplay {
  const [settings] = useSettings()
  const active = homeDisplaySignal.value
  const pins = settings.ui.homePins
  const display = pins.includes(active) ? active : (pins[0] ?? "homeTimeline")

  useEffect(() => {
    if (homeDisplaySignal.value !== display) homeDisplaySignal.value = display
  }, [display])

  return display
}

function setNotes(update: Note[] | ((prev: Note[]) => Note[])) {
  tlNotesSignal.value = typeof update === "function" ? update(tlNotesSignal.value) : update
}

function setMore(fn: () => void) {
  tlMoreSignal.value = [fn]
}

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useTL() {
  const notes = tlNotesSignal.value
  const [more] = tlMoreSignal.value
  return { notes, more }
}

// todo: ノートの内容をいい感じにキャッシュ
export function useTLStream() {
  const display = useHomeDisplay()
  // リスト表示中は裏でHTLを流しておく
  const tlName: TLNames = display.startsWith("list:")
    ? "homeTimeline"
    : (display as Exclude<HomeDisplay, `list:${string}`>)
  const chan = useChannel(tlName)
  const api = useAPI()
  const [untilId, setUntilId] = useState("")
  const [beginStream, setBeginStream] = useState(false)

  // reload
  useEffect(() => {
    if (api) {
      setBeginStream(false)
      setNotes([])
      api.notes(tlName, { limit: 10 }).then(res => {
        if (res?.length) {
          setNotes(res)
          setUntilId(res[res.length - 1].id)
          setBeginStream(true)
        }
      })
    }
  }, [api, tlName])

  // stream
  useEffect(() => {
    if (beginStream) chan?.on("note", note => setNotes(notes => [note, ...notes]))
  }, [chan, beginStream])

  // scroll
  useEffect(() => {
    if (api)
      setMore(async () => {
        const res = await api.notes(tlName, { limit: 30, untilId })
        if (res?.length) {
          setNotes(notes => notes.concat(res))
          setUntilId(res[res.length - 1].id)
        }
      })
  }, [api, untilId, tlName])
}
