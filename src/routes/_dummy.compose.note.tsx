import { useNavigate } from "@remix-run/react"
import { useEffect } from "react"
import { useComposeNoteDialog, useComposeNoteLastVisibility } from "~/features/compose"

export default function NotePage() {
  const navigate = useNavigate()
  const [, setNoteDialog] = useComposeNoteDialog()

  useComposeNoteLastVisibility() // おまじない

  useEffect(() => {
    setNoteDialog(true)
    navigate("/home", { replace: true })
  }, [navigate, setNoteDialog])
}
