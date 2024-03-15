"use client"

import { Suspense, use, useMemo } from "react"
import { useAPI } from "~/features/api"

export const Messages = () => (
  <Suspense fallback={<p>Loading</p>}>
    <MessagesSuspense />
  </Suspense>
)

const useMessages = () => {
  const api = useAPI()
  const messages = use(useMemo(async () => await api?.directMessage(), [api]))
  return messages
}

const MessagesSuspense = () => {
  const messages = useMessages()
  return <div>{messages?.map(m => <div key={m.id}>{m.text}</div>)}</div>
}

export default Messages
