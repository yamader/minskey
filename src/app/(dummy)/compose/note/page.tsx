"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useComposeNoteDialog, useComposeNoteLastVisibility } from "~/features/compose"

export default function NotePage() {
  const router = useRouter()
  const [, setNoteDialog] = useComposeNoteDialog()

  useComposeNoteLastVisibility() // おまじない

  useEffect(() => {
    setNoteDialog(true)
    router.replace("/home")
  }, [router, setNoteDialog])
}
