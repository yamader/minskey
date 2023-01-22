import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useAtom } from "jotai"
import Link from "next/link"
import { Suspense } from "react"

import BrandLogo from "~/components/BrandLogo"
import LinkButton from "~/components/LinkButton"
import ProfileIcon from "~/components/ProfileIcon"
import UserIcon from "~/components/UserIcon"
import { accountAtom, profileAtom } from "~/libs/atoms"

function UserMenu() {
  const [account, setAccount] = useAtom(accountAtom)
  const [profile] = useAtom(profileAtom)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="rounded-full bg-white outline-none hover:brightness-95" aria-label="User menu">
          <ProfileIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-2 w-48 rounded-lg border bg-white p-2 drop-shadow">
          <DropdownMenu.Item asChild>
            <Link
              className="flex flex-col rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
              href={`/profile?user=@${profile!.username}@${account!.host}`}>
              <span className="overflow-hidden text-ellipsis text-lg font-bold">{profile!.name}</span>
              <span className="overflow-hidden text-ellipsis font-inter text-sm font-bold text-neutral-500">
                @{profile!.username}@{account!.host}
              </span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="m-2 h-px bg-neutral-200" />
          <DropdownMenu.Item asChild>
            <Link
              className="flex rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
              href="/settings">
              設定
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="rounded-lg px-3 py-2 font-bold text-red-500 outline-none hover:bg-red-100 active:bg-red-200"
            onClick={() => setAccount(null)}>
            ログアウト
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default function CommonHeader() {
  const [account] = useAtom(accountAtom)

  return (
    <header className="flex items-center justify-between">
      <Link className="py-1" href="/">
        <BrandLogo />
      </Link>
      <nav className="flex items-center space-x-4 font-inter">
        <ul className="flex space-x-4 font-bold text-stone-700">
          <li className="flex hover:underline">
            <Link href="/about">About</Link>
          </li>
        </ul>
        {account ? (
          <Suspense
            fallback={
              <div className="h-12 w-12">
                <UserIcon />
              </div>
            }>
            <UserMenu />
          </Suspense>
        ) : (
          <LinkButton href="/login">Login</LinkButton>
        )}
      </nav>
    </header>
  )
}
