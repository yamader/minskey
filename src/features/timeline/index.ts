export type TLNames = "homeTimeline" | "localTimeline" | "hybridTimeline" | "globalTimeline"

import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useEffect, useState } from "react"
import { useAPI, useChannel } from "~/features/api"
import { Note } from "~/features/note"

//------------------------------------------------------------//
//  atoms
//------------------------------------------------------------//

const tlNameAtom = atomWithStorage<TLNames>("minsk::tl::name", "homeTimeline")
const tlNotesAtom = atom<Note[]>([])
const tlMoreAtom = atom<[() => void]>([() => {}])

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useTL() {
  const notes = useAtomValue(tlNotesAtom)
  const [more] = useAtomValue(tlMoreAtom)
  return { notes, more }
}

export function useTLName() {
  return useAtom(tlNameAtom)
}

// todo: ノートの内容をいい感じにキャッシュ
export function useTLStream() {
  const tlName = useAtomValue(tlNameAtom)
  const chan = useChannel(tlName)
  const api = useAPI()
  const setNotes = useSetAtom(tlNotesAtom)
  const setMore = useSetAtom(tlMoreAtom)
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
      setMore([
        async () => {
          const res = await api.notes(tlName, { limit: 30, untilId })
          if (res?.length) {
            setNotes(notes => notes.concat(res))
            setUntilId(res[res.length - 1].id)
          }
        },
      ])
  }, [api, untilId])
}
