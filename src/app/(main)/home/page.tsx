"use client"

import { Loader2 } from "lucide-react"

import { useBottom } from "~/features/common"
import NotePreview from "~/features/note/NotePreview"
import { useTL } from "~/features/timeline"
import TLSwitch from "~/features/timeline/TLSwitch"

// todo: TLの切り替え
export default function HomePage() {
  const { notes, more } = useTL()
  useBottom(more)

  return (
    <>
      <div className="rounded-xl border border-neutral-100 bg-white shadow">
        <TLSwitch />
        <div className="flex flex-col">
          {notes.map((note, i) => (
            <div className="border-t" key={i}>
              <NotePreview note={note} />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mb-8 mt-6 flex items-center gap-1 font-bold">
        <Loader2 className="animate-spin" size={24} />
        <p className="text-center">Loading...</p>
      </div>
    </>
  )
}
