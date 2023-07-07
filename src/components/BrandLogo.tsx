import Image from "next/image"

import Icon from "~/assets/icon.png"

export default function BrandLogo() {
  return (
    <div className="flex items-center">
      <Image src={Icon} width={56} height={56} alt="logo" />
      <span className="mx-1 font-inter text-xl font-black text-misskey">minskey</span>
    </div>
  )
}
