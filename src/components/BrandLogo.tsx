import Icon from "~/assets/icon.png"

export default function BrandLogo() {
  return (
    <div className="flex w-fit items-center gap-1">
      <img src={Icon} width={42} height={42} alt="minskey logo" />
      <span className="-mt-0.5 font-black font-inter text-misskey text-xl">minskey</span>
    </div>
  )
}
