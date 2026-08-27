export type { UserList } from "./types"

import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import { useAPI, useChannel } from "~/features/api"
import { Note } from "~/features/note"
import { UserList } from "."

export function useLists() {
  const api = useAPI()
  const [lists, setLists] = useState<UserList[] | null>(null)

  const refresh = useCallback(() => {
    if (api) api.lists().then(res => setLists(res ?? []))
  }, [api])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { lists, refresh }
}

export function useListTimeline(listId: string) {
  const api = useAPI()
  const chan = useChannel("userList", { listId })
  const [notes, setNotes] = useState<Note[]>([])
  const untilRef = useRef("")
  const busyRef = useRef(false)

  useEffect(() => {
    if (!api || !listId) return
    untilRef.current = ""
    busyRef.current = false
    setNotes([])
    api.listTimeline(listId, { limit: 10 }).then(res => {
      if (res?.length) {
        setNotes(res)
        untilRef.current = res[res.length - 1].id
      }
    })
  }, [api, listId])

  useEffect(() => {
    chan?.on("note", note => setNotes(notes => [note, ...notes]))
  }, [chan])

  const more = useCallback(async () => {
    if (!api || busyRef.current) return
    busyRef.current = true
    const res = await api.listTimeline(listId, { limit: 30, untilId: untilRef.current })
    if (res?.length) {
      setNotes(notes => notes.concat(res))
      untilRef.current = res[res.length - 1].id
    }
    busyRef.current = false
  }, [api, listId])

  return { notes, more }
}
