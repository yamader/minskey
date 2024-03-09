"use client"

import clsx from "clsx"
import { Bell, Home, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BrandLogo from "~/components/BrandLogo"
import { useLogin } from "~/features/auth"
import { useNoteDialog } from "~/features/note"
import UserMenu from "./UserMenu"

const btnBase = "flex w-fit items-center rounded-full leading-none transition"

export default function LeftNav() {
  const account = useLogin()

  const w = "w-32 xl:w-72"
  return (
    <div className={w}>
      <nav className={clsx(w, "fixed flex h-full flex-col gap-5 border-r p-2")}>
        <div className="flex flex-col">
          <Link
            className={clsx(btnBase, "mb-1 p-1 pr-3 hover:bg-neutral-200")}
            href={account ? "/home/" : "/"}>
            <BrandLogo />
          </Link>
          <NavLink href="/home/">
            <Home size={24} />
            ホーム
          </NavLink>
          <NavLink href="/notifications/">
            <Bell size={24} />
            通知
          </NavLink>
          <NavLink href="/settings/">
            <Settings size={24} />
            設定
          </NavLink>
        </div>
        <ActionBtn />
        <div className="mt-auto">{account ? <UserMenu /> : null}</div>
      </nav>
    </div>
  )
}

function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
  const pathname = usePathname()
  return (
    <Link className="*:hover:bg-neutral-200" href={href}>
      <span
        className={clsx(btnBase, "my-1 gap-4 p-3 pr-6 text-xl", pathname == href && "font-bold")}>
        {children}
      </span>
    </Link>
  )
}

function ActionBtn() {
  const [, setNoteDialog] = useNoteDialog()
  const account = useLogin()

  const className = clsx(
    btnBase,
    "bg-misskey px-20 py-4 font-bold text-white hover:bg-misskey hover:brightness-90",
  )

  return account ? (
    <Link className={className} href="/compose/note/" onClick={() => setNoteDialog(true)}>
      ノートする
    </Link>
  ) : (
    <Link className={className} href="/login">
      ログイン
    </Link>
  )
}
