import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router"

export default function SettingsSectionBar({ tag, href }: { tag: string; href: string }) {
  const { pathname } = useLocation()

  return (
    <Link
      to={href}
      className={clsx(
        "relative flex items-center justify-between p-3 transition hover:bg-neutral-200",
        pathname.startsWith(href) &&
          "after:absolute after:right-0 after:h-full after:w-[3px] after:bg-misskey",
      )}>
      <span>{tag}</span>
      <ChevronRight size={20} />
    </Link>
  )
}
