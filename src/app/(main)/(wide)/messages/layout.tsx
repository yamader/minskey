"use client"

import { Suspense } from "react"
import { useDirectMessages } from "~/features/messages"

const MessagesLayoutSuspense = () => {
  const messages = useDirectMessages()

  return (
    <div className="flex">
      <div className="w-[36rem]">
        <hr />
        {messages?.map(m => m.user.name) ?? []}
      </div>
    </div>
  )
}

const MessagesLayout = () => (
  <Suspense fallback={<></>}>
    <MessagesLayoutSuspense />
  </Suspense>
)

export default MessagesLayout
