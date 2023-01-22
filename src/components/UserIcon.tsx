import Image from "next/image"

export default function UserIcon({ src }: { src?: string | null }) {
  return src ? (
    <img className="h-full overflow-hidden rounded-full" src={src} alt="icon" />
  ) : (
    <Image
      className="h-full overflow-hidden rounded-full"
      width={128}
      height={128}
      src="/anon.png"
      alt="default icon"
    />
  )
}
