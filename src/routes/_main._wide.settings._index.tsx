import { useNavigate } from "@remix-run/react"

export default function SettingsPage() {
  const navigate = useNavigate()
  navigate("ui")
}
