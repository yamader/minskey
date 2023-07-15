"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useNoteDialog } from "~/features/note"

export default function NotePage() {
  const router = useRouter()
  const [, setNoteDialog] = useNoteDialog()

  useEffect(() => {
    setNoteDialog(true)
    router.replace("/home")
  }, [router, setNoteDialog])
}
