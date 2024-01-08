import { atom, useAtomValue, useSetAtom } from "jotai"
import { entities } from "misskey-js"
import { useCallback, useEffect, useState } from "react"
import { useAPI, useStream } from "../api"
import { useLogin } from "../auth"

////////////////////////////////////////////////////////////////
//  atoms
////////////////////////////////////////////////////////////////

type Notifications = {
  notifications: entities.Notification[]
  more: () => Promise<void>
}

export const notificationsAtom = atom<Notifications>({ notifications: [], more: () => Promise.resolve() })

////////////////////////////////////////////////////////////////
//  hooks
////////////////////////////////////////////////////////////////

export const useNotificationsStream = () => {
  useSetAtom(notificationsAtom)(useNotificationsRaw())
}

export const useNotifications = () => useAtomValue(notificationsAtom)

export const useNotificationsRaw = () => {
  const stream = useStream("main")
  const api = useAPI()
  const [notifications, setNotifications] = useState<entities.Notification[]>([])

  const account = useLogin(true)
  const host = account?.host ?? null

  // first time
  useEffect(() => {
    if (!api) return
    ;(async () => {
      const res = await api.request("i/notifications", {
        limit: 10,
      })
      setNotifications(res)
    })()
  }, [api, host])

  // streaming
  useEffect(() => {
    if (!api) return

    const conn = stream?.on("notification", notice => {
      setNotifications(prev => [notice, ...prev])
    })

    return () => {
      conn?.off("notification")
    }
  }, [api, stream, host])

  // scroll
  const more = useCallback(async () => {
    if (!api) return
    const res = await api.request("i/notifications", {
      limit: 10,
      //sinceId: notifications[notifications.length - 1].id,
      untilId: notifications[notifications.length - 1].id,
    })
    //res.forEach(notice => (notice.user.host ??= host))
    setNotifications(prev => prev.concat(res))
  }, [api, notifications])

  return { notifications, more }
}
