import Image from "next/image"

export default function BrandLogo() {
  return (
    <div className="flex items-center">
      <Image className="h-14 w-14" width={64} height={64} src="/icon.png" alt="logo" />
      <span className="mx-1 font-inter text-xl font-black text-misskey">minskey</span>
    </div>
  )
}
