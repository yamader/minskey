"use client"

import { useMfmProvider } from "~/features/common/mfm"
import NoteDialog from "~/features/note/NoteDialog"
import { useNotificationsStream } from "~/features/notifications"
import { useTLStream } from "~/features/timeline"
import BottomNav from "./BottomNav"
import LeftNav from "./LeftNav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  useMfmProvider()
  useTLStream()
  useNotificationsStream()

  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <div className="flex grow ">
          <LeftNav />
          {children}
        </div>
        <BottomNav />
      </div>

      <NoteDialog />
    </>
  )
}
