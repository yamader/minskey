export * from "./types"

import { atom, useAtomValue, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { useAPI, useChannel } from "~/features/api"
import { Notification } from "."

//------------------------------------------------------------//
//  atoms
//------------------------------------------------------------//

const notificationsAtom = atom<Notification[]>([])
const notificationsMoreAtom = atom<[() => void]>([() => {}])

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useNotifications() {
  const notifications = useAtomValue(notificationsAtom)
  const [more] = useAtomValue(notificationsMoreAtom)
  return { notifications, more }
}

export function useNotificationsStream() {
  const chan = useChannel("main")
  const api = useAPI()
  const setNotifications = useSetAtom(notificationsAtom)
  const setMore = useSetAtom(notificationsMoreAtom)
  const [untilId, setUntilId] = useState<string>()

  // reload
  useEffect(() => {
    api?.notifications({ limit: 30 }).then(res => {
      if (res?.length) {
        setNotifications(res)
        setUntilId(res[res.length - 1].id)
      }
    })
  }, [api])

  // stream
  useEffect(() => {
    chan?.on("notification", notice => {
      setNotifications(prev => [notice, ...prev])
    })
  }, [chan])

  // scroll
  useEffect(() => {
    if (api)
      setMore([
        async () => {
          const res = await api.notifications({ limit: 30, untilId })
          if (res?.length) {
            setNotifications(a => a.concat(res))
            setUntilId(res[res.length - 1].id)
          }
        },
      ])
  }, [api, untilId])
}
