"use client"

import BottomSpinner from "~/components/BottomSpinner"
import { useBottom } from "~/features/common"
import { useNotifications } from "~/features/notifications"
import Notice from "~/features/notifications/Notice"

export default function NotificationsPage() {
  const { notifications, more } = useNotifications()

  useBottom(more)
  return (
    <>
      <div className="flex flex-col rounded-xl bg-white">
        {notifications.map(notice => {
          return <Notice notice={notice} key={notice.id} />
        })}
      </div>
      <BottomSpinner />
    </>
  )
}
