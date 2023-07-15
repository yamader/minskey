import { Globe, Home, Lock, LucideProps, Mail } from "lucide-react"
import { Endpoints } from "misskey-js"

export type Visibility = Endpoints["notes/create"]["req"]["visibility"]

export default function VisivilityIcon({ name, ...props }: LucideProps & { name: Visibility }) {
  // prettier-ignore
  switch (name) {
    case "public":    return <Globe {...props} />
    case "home":      return <Home {...props} />
    case "followers": return <Lock {...props} />
    case "specified": return <Mail {...props} />
  }
}
