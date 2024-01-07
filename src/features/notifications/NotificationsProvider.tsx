"use client"

import { ReactNode } from "react"
import { useNotificationsStream } from "."

export default function NotificationsProvider({ children }: { children: ReactNode }) {
  useNotificationsStream()
  return children
}
