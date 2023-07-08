import { entities } from "misskey-js"
import { useCallback, useEffect, useState } from "react"

import { TLChanNames, useAPI, useStream } from "~/features/api/libs"
import { useLogin } from "~/features/auth/libs"

// todo: ノートの内容をいい感じにキャッシュ
export function useTL(channel: TLChanNames) {
  const stream = useStream(channel)
  const api = useAPI()
  const [notes, setNotes] = useState<entities.Note[]>([])

  useLogin(true)

  // first time
  useEffect(() => {
    if (!api) return
    ;(async () => {
      const res = await api.request("notes/timeline", {
        limit: 10,
      })
      setNotes(res)
    })()
  }, [api])

  // streaming
  useEffect(() => {
    if (!stream) return
    const conn = stream?.on("note", note => {
      setNotes(notes => notes.concat(note))
    })
    return () => {
      conn?.off("note")
    }
  }, [stream])

  // scroll
  const more = useCallback(async () => {
    if (!api || !notes.length) return
    const res = await api.request("notes/timeline", {
      limit: 30,
      untilId: notes[notes.length - 1].id,
    })
    setNotes(notes => notes.concat(res))
  }, [api, notes])

  return { notes, more }
}
