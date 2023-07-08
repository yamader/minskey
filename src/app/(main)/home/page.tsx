"use client"

import { Loader2 } from "lucide-react"

import { useTL } from "~/features/timeline/libs"
import NotePreview from "~/features/timeline/NotePreview"
import { useBottom } from "~/libs/utils"

// todo: TLの切り替え
export default function HomePage() {
  const { notes, more } = useTL("homeTimeline")

  useBottom(more)

  return (
    <>
      <div className="rounded-xl border border-neutral-100 bg-white shadow">
        <div className="flex justify-center">
          <p className="border-x px-4 py-2">※これはHTLです</p>
        </div>
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
