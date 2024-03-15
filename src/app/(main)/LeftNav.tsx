"use client"

import clsx from "clsx"
import { Bell, Home, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BrandLogo from "~/components/BrandLogo"
import { useLogin } from "~/features/auth"
import { useNoteDialog } from "~/features/note"
import AccountMenu from "./AccountMenu"

const btnBase = "flex w-fit items-center rounded-full leading-none transition"

export default function LeftNav() {
  const [, setNoteDialog] = useNoteDialog()
  const account = useLogin()

  const w = "w-32 xl:w-72"
  return (
    <div className={w}>
      <nav className={clsx(w, "fixed flex h-full flex-col gap-5 border-r p-2 pb-3")}>
        <div className="flex flex-col">
          <Link
            className={clsx(btnBase, "mb-1 p-1 pr-3 hover:bg-neutral-200")}
            href={account ? "/home/" : "/"}>
            <BrandLogo />
          </Link>
          <NavLink href="/home/" available={!!account}>
            <Home size={24} />
            ホーム
          </NavLink>
          <NavLink href="/notifications/" available={!!account}>
            <Bell size={24} />
            通知
          </NavLink>
          <NavLink href="/profile/" available={!!account}>
            <User size={24} />
            プロフィール
          </NavLink>
          <NavLink href="/settings/" available={!!account}>
            <Settings size={24} />
            設定
          </NavLink>
        </div>
        <Link
          className={clsx(
            btnBase,
            "bg-misskey px-20 py-4 font-bold hover:bg-misskey hover:brightness-90",
            account ? "text-white" : "text-gray-300",
          )}
          href="/compose/note/"
          onClick={() => setNoteDialog(true)}>
          ノートする
        </Link>
        <div className="mt-auto">
          <AccountMenu />
        </div>
      </nav>
    </div>
  )
}

function NavLink({
  children,
  href,
  available,
}: {
  children: React.ReactNode
  href: string
  available: boolean
}) {
  const pathname = usePathname()
  return available ? (
    <Link className="*:hover:bg-neutral-200" href={href}>
      <span
        className={clsx(btnBase, "my-1 gap-4 p-3 pr-6 text-xl", pathname == href && "font-bold")}>
        {children}
      </span>
    </Link>
  ) : (
    <span>
      <span
        className={clsx(
          btnBase,
          "my-1 select-none gap-4 p-3 pr-6 text-xl text-gray-400",
          pathname == href && "font-bold",
        )}>
        {children}
      </span>
    </span>
  )
}
