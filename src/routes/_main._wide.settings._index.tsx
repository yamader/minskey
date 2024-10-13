import { useEffect } from "react"
import { useNavigate } from "react-router"
import NBSK from "~/components/NBSK"

export default function SettingsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("ui/")
  }, [navigate])

  return <NBSK />
}
