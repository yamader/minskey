import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { entities } from "misskey-js"
import { useCallback, useEffect, useState } from "react"

import { TLChanNames, useAPI, useStream } from "~/features/api"
import { useLogin } from "~/features/auth"

////////////////////////////////////////////////////////////////
//  atoms
////////////////////////////////////////////////////////////////

type TL = {
  notes: entities.Note[]
  more: () => Promise<void>
}

// ストリーミングするTLを選択
export const tlNameAtom = atomWithStorage<TLChanNames>("minsk::tl::name", "homeTimeline")

export const tlAtom = atom<TL>({ notes: [], more: () => Promise.resolve() })

////////////////////////////////////////////////////////////////
//  hooks
////////////////////////////////////////////////////////////////

// TLのストリーミングを管理する
export function useTLStream() {
  const chan = useAtomValue(tlNameAtom)
  useSetAtom(tlAtom)(useTLRaw(chan))
}

export function useTLName() {
  return useAtom(tlNameAtom)
}

export function useTL() {
  return useAtomValue(tlAtom)
}

// todo: ノートの内容をいい感じにキャッシュ
function useTLRaw(chan: TLChanNames) {
  const stream = useStream(chan)
  const api = useAPI()
  const [notes, setNotes] = useState<entities.Note[]>([])

  const account = useLogin(true)
  const host = account?.host ?? null

  // first time
  useEffect(() => {
    if (!api) return
    ;(async () => {
      const res = await api.request("notes/timeline", {
        limit: 10,
      })
      res.forEach(note => (note.user.host ??= host))
      setNotes(res)
    })()
  }, [api, host])

  // streaming
  useEffect(() => {
    if (!stream) return
    const conn = stream?.on("note", note => {
      note.user.host ??= host
      setNotes(notes => [note, ...notes])
    })
    return () => {
      conn?.off("note")
    }
  }, [stream, host])

  // scroll
  const more = useCallback(async () => {
    if (!api || !notes.length) return
    const res = await api.request("notes/timeline", {
      limit: 30,
      untilId: notes[notes.length - 1].id,
    })
    res.forEach(note => (note.user.host ??= host))
    setNotes(notes => notes.concat(res))
  }, [api, notes, host])

  return { notes, more }
}