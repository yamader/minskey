"use client"

import { useMfmProvider } from "~/features/common/mfm"
import NoteDialog from "~/features/note/NoteDialog"
import { useNotificationsStream } from "~/features/notifications"
import { useTLStream } from "~/features/timeline"
import Header from "./Header"
import Nav from "./Nav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  useMfmProvider()
  useTLStream()
  useNotificationsStream()

  return (
    <>
      <div className="flex min-h-screen flex-col bg-neutral-100">
        <main className="mx-auto flex w-full max-w-4xl grow flex-col px-4">
          <Header />
          {children}
        </main>
      </div>

      <Nav />
      <NoteDialog />
    </>
  )
}
