"use client"

import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import TopAppBar from "~/components/TopAppBar"

export default function SetingsPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-full">
        <div className="w-96 border-r">
          <TopAppBar content="設定" />
          <SettingsSectionBar tag="表示" href="/settings/ui/" />
          <SettingsSectionBar tag="アカウント" href="/settings/account/" />
          <SettingsSectionBar tag="その他" href="/settings/misc/" />
        </div>
        <div className="flex w-[36rem] flex-col">{children}</div>
      </div>
    </>
  )
}

function SettingsSectionBar({ tag, href }: { tag: string; href: string }) {
  const pathname = usePathname()

  return (
    <Link href={href} passHref>
      <div
        className={clsx(
          "relative flex items-center justify-between p-3 transition hover:bg-neutral-200",
          pathname.startsWith(href) &&
            "after:absolute after:right-0 after:h-full after:w-[3px] after:bg-misskey",
        )}>
        <span>{tag}</span>
        <ChevronRight size={20} />
      </div>
    </Link>
  )
}
