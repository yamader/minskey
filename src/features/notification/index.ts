export * from "./types"

import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { useAPI, useChannel } from "~/features/api"
import { Notification } from "."

//------------------------------------------------------------//
//  signals
//------------------------------------------------------------//

const notificationsSignal = signal<Notification[]>([])
const notificationsMoreSignal = signal<[() => void]>([() => {}])

function setNotifications(update: Notification[] | ((prev: Notification[]) => Notification[])) {
  notificationsSignal.value =
    typeof update === "function" ? update(notificationsSignal.value) : update
}

function setMore(fn: () => void) {
  notificationsMoreSignal.value = [fn]
}

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useNotifications() {
  const notifications = notificationsSignal.value
  const [more] = notificationsMoreSignal.value
  return { notifications, more }
}

export function useNotificationsStream() {
  const chan = useChannel("main")
  const api = useAPI()
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
      setMore(async () => {
        const res = await api.notifications({ limit: 30, untilId })
        if (res?.length) {
          setNotifications(a => a.concat(res))
          setUntilId(res[res.length - 1].id)
        }
      })
  }, [api, untilId])
}
