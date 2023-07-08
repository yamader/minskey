import { entities } from "misskey-js"
import { useCallback, useEffect, useState } from "react"

import { TLChanNames, useAPI, useStream } from "~/features/api/libs"
import { useLogin } from "~/features/auth/libs"

// todo: ノートの内容をいい感じにキャッシュ
export function useTL(channel: TLChanNames) {
  const stream = useStream(channel)
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
