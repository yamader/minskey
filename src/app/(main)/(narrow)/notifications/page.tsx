"use client"

import { useBottom } from "~/features/common"
import { useNotifications } from "~/features/notifications"
import Notice from "~/features/notifications/Notice"

export default function NotificationsPage() {
  const { notifications, more } = useNotifications()

  useBottom(more)
  return (
    <>
      <div className="flex flex-col bg-white rounded-xl">
        {notifications.map(notice => {
          return <Notice notice={notice} key={notice.id} />
        })}
      </div>
    </>
  )
}
