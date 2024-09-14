"use client"

import BottomNav from "~/components/BottomNav"
import LeftNav from "~/components/LeftNav"
import { useMfmProvider } from "~/features/common/mfm"
import NoteDialog from "~/features/compose/NoteDialog"
import { useNotificationsStream } from "~/features/notification"
import { useTLStream } from "~/features/timeline"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  useMfmProvider()
  useTLStream()
  useNotificationsStream()

  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <div className="flex grow">
          <LeftNav />
          {children}
        </div>
        <BottomNav />
      </div>

      <NoteDialog />
    </>
  )
}
