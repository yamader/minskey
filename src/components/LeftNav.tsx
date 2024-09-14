import clsx from "clsx"
import { Bell, Home, Pen, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AccountMenu from "~/components/AccountMenu"
import BrandLogo from "~/components/BrandLogo"
import Button from "~/components/Button"
import { useLogin } from "~/features/auth"
import { useComposeNoteDialog } from "~/features/compose"

const btnBase = "flex w-fit items-center rounded-full leading-none transition"

export default function LeftNav() {
  const [, setNoteDialog] = useComposeNoteDialog()
  const account = useLogin()

  const w = "w-36 xl:w-72"
  return (
    <div className={clsx(w, "hidden lg:block")}>
      <nav className={clsx(w, "fixed flex h-full flex-col gap-5 border-r p-2 pb-3")}>
        <div className="flex flex-col">
          <Link
            className={clsx(btnBase, "mb-1 p-1 pr-3 hover:bg-neutral-200")}
            href={account ? "/home/" : "/"}>
            <BrandLogo />
          </Link>
          <NavLink href="/home/" disabled={!account}>
            <Home size={24} />
            <span className="hidden xl:block">ホーム</span>
          </NavLink>
          <NavLink href="/notifications/" disabled={!account}>
            <Bell size={24} />
            <span className="hidden xl:block">通知</span>
          </NavLink>
          <NavLink href="/profile/" disabled={!account}>
            <User size={24} />
            <span className="hidden xl:block">プロフィール</span>
          </NavLink>
          <NavLink href="/settings/">
            <Settings size={24} />
            <span className="hidden xl:block">設定</span>
          </NavLink>
        </div>
        <Link
          className={clsx(
            btnBase,
            "bg-misskey px-4 py-4 font-bold text-white hover:bg-misskey hover:brightness-90 xl:px-20",
            !account && "pointer-events-none brightness-75",
          )}
          href="/compose/note/"
          onClick={() => setNoteDialog(true)}>
          <span className="hidden select-none xl:block">ノートする</span>
          <Pen className="xl:hidden" size={16} />
        </Link>
        <div className="mt-auto">
          {account ? (
            <AccountMenu />
          ) : (
            <Link href="/login">
              <Button>ログイン</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

function NavLink({
  children,
  href,
  disabled,
}: {
  children: React.ReactNode
  href: string
  disabled?: boolean
}) {
  const pathname = usePathname()

  return (
    <Link
      className={clsx("*:hover:bg-neutral-200", disabled && "pointer-events-none text-neutral-400")}
      href={href}>
      <div
        className={clsx(
          btnBase,
          "my-1 select-none gap-4 p-3 pr-6 text-xl",
          pathname.startsWith(href) && "font-bold",
        )}>
        {children}
      </div>
    </Link>
  )
}
