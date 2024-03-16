import Image from "next/image"

import Icon from "~/assets/icon.png"

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-1 w-fit">
      <Image src={Icon} width={42} height={42} alt="minskey logo" />
      <span className="-mt-0.5 font-inter text-xl font-black text-misskey">minskey</span>
    </div>
  )
}
