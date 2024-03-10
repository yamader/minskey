"use client"

import NoteDialog from "~/features/note/NoteDialog"
import LeftNav from "./LeftNav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
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
