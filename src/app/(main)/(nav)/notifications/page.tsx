"use client"

import { useNotifications } from "~/features/notifications"
import Notice from "~/features/notifications/Notice"

export default function NotificationsPage() {
  const { notifications } = useNotifications()

  return (
    <>
      <div className="rounded-xl border border-neutral-100 bg-white shadow">
        <div className="flex flex-col">
          {notifications.map(notice => {
            console.log(notice)
            return <Notice notice={notice} key={notice.id} />
          })}
        </div>
      </div>
    </>
  )
}
