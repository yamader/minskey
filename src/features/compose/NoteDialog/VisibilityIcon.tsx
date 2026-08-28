import { Globe, Home, Lock, LucideProps, Mail } from 'lucide-preact'

export type Visibility = 'public' | 'home' | 'followers' | 'specified' | undefined

export default function VisivilityIcon({ name, ...props }: LucideProps & { name: Visibility }) {
  switch (name) {
    case 'public':
      return <Globe {...props} />
    case 'home':
      return <Home {...props} />
    case 'followers':
      return <Lock {...props} />
    case 'specified':
      return <Mail {...props} />
  }
}
