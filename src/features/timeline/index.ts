export type TLNames = "homeTimeline" | "localTimeline" | "hybridTimeline" | "globalTimeline"

import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { useAPI, useChannel } from "~/features/api"
import { Note } from "~/features/note"
import { persistedSignal } from "~/utils"

//------------------------------------------------------------//
//  signals
//------------------------------------------------------------//

const tlNameSignal = persistedSignal<TLNames>("minsk::tl::name", "homeTimeline")
const tlNotesSignal = signal<Note[]>([])
const tlMoreSignal = signal<[() => void]>([() => {}])

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

export function useTLName() {
  return [tlNameSignal.value, (v: TLNames) => (tlNameSignal.value = v)] as const
}

// todo: ノートの内容をいい感じにキャッシュ
export function useTLStream() {
  const tlName = tlNameSignal.value
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
  }, [api, untilId])
}
