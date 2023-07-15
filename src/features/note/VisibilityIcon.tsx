import { Globe, Home, Lock, LucideIcon, Mail } from "lucide-react"
import { Endpoints } from "misskey-js"
import { ComponentProps } from "react"

export type Visibility = Endpoints["notes/create"]["req"]["visibility"]

export default function VisivilityIcon({ name, ...props }: ComponentProps<LucideIcon> & { name: Visibility }) {
  // prettier-ignore
  switch (name) {
    case "public":    return <Globe {...props} />
    case "home":      return <Home {...props} />
    case "followers": return <Lock {...props} />
    case "specified": return <Mail {...props} />
  }
}
