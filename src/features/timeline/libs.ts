import { entities } from "misskey-js"
import { useState } from "react"

import { TLChanNames, useStream } from "~/features/api/libs"

// todo: いい感じにキャッシュ
export function useTL(channel: TLChanNames) {
  const stream = useStream(channel)
  const [notes, setNotes] = useState<entities.Note[]>([])

  // todo: check leak
  stream?.on("note", note => {
    setNotes([...notes, note])
  })

  return { notes }
}
