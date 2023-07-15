"use client"

import clsx from "clsx"
import { Bell, Edit3, Home } from "lucide-react"
import Link from "next/link"

import { useNoteDialog } from "~/features/note"

export default function Nav() {
  const [, setNoteDialog] = useNoteDialog()

  const _btn = "rounded-full hover:shadow p-3 font-black text-white shadow hover:brightness-90"
  const btn = clsx(_btn, "bg-neutral-600")
  const btnStrong = clsx(_btn, "bg-misskey")
  const sep = "m-auto h-8 border border-neutral-500"
  return (
    <div className="fixed bottom-2 left-1/2 flex translate-x-[-50%] gap-2.5 rounded-full border border-neutral-700 bg-neutral-900/95 p-3 shadow-lg">
      <Link className={btn} href="/home">
        <Home size={24} />
      </Link>
      <Link className={btn} href="/notifications">
        <Bell size={24} />
      </Link>
      <hr className={sep} />
      <button className={btnStrong} onClick={() => setNoteDialog(true)}>
        <Edit3 size={24} />
      </button>
    </div>
  )
}
