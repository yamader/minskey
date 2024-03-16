"use client"

import { useMfmProvider } from "~/features/common/mfm"
import NoteDialog from "~/features/note/NoteDialog"
import { useNotificationsStream } from "~/features/notification"
import { useTLStream } from "~/features/timeline"
import LeftNav from "./LeftNav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  useMfmProvider()
  useTLStream()
  useNotificationsStream()

  return (
    <>
      <div className="flex h-screen justify-center">
        <LeftNav />
        {children}
      </div>

      <NoteDialog />
    </>
  )
}
