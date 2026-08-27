import { useEffect } from "preact/hooks"
import { useComposeNoteDialog, useComposeNoteLastVisibility } from "~/features/compose"
import { useRouter } from "~/router"

export default function ComposeNotePage() {
  const router = useRouter()
  const [, setNoteDialog] = useComposeNoteDialog()

  useComposeNoteLastVisibility() // おまじない

  useEffect(() => {
    setNoteDialog(true)
    router.replace("/home")
  }, [router, setNoteDialog])

  return null
}
