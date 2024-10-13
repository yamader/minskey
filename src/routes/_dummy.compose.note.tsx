import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useComposeNoteDialog, useComposeNoteLastVisibility } from "~/features/compose"

export default function NotePage() {
  const navigate = useNavigate()
  const [, setNoteDialog] = useComposeNoteDialog()

  useComposeNoteLastVisibility() // おまじない

  useEffect(() => {
    setNoteDialog(true)
    navigate("/home/", { replace: true })
  }, [navigate, setNoteDialog])
}
