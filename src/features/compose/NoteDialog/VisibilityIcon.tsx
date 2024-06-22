import { Globe, Home, Lock, LucideIcon, Mail } from "lucide-react"
import { ComponentProps } from "react"

export type Visibility = "public" | "home" | "followers" | "specified" | undefined

export default function VisivilityIcon({
  name,
  ...props
}: ComponentProps<LucideIcon> & { name: Visibility }) {
  // prettier-ignore
  switch (name) {
    case "public":    return <Globe {...props} />
    case "home":      return <Home {...props} />
    case "followers": return <Lock {...props} />
    case "specified": return <Mail {...props} />
  }
}
