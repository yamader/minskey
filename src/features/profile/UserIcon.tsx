import Image from "next/image"

import Anon from "~/assets/anon.png"

export default function UserIcon({ src }: { src?: string | null }) {
  const className = "h-full overflow-hidden rounded-full"

  return src ? (
    <img className={className} src={src} alt="icon" />
  ) : (
    <Image className={className} src={Anon} alt="icon" />
  )
}
