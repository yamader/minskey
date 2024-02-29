"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { ReactNode, Suspense } from "react"

import BrandLogo from "~/components/BrandLogo"
import LinkButton from "~/components/LinkButton"
import { Account, useAccounts, useAuth, useLogin } from "~/features/auth"
import ProfileIcon from "~/features/profile/ProfileIcon"
import UserIcon from "~/features/profile/UserIcon"

export default function Header() {
  const account = useLogin()

  return (
    <header className="flex items-center justify-between">
      <Link className="py-1" href={account ? "/home" : "/"}>
        <BrandLogo />
      </Link>
      <nav className="flex items-center space-x-4 font-inter">
        <ul className="flex space-x-4 font-bold text-stone-700">
          <HeaderLink href="/about">About</HeaderLink>
          <HeaderLink href="/help">Help</HeaderLink>
        </ul>
        {account ? (
          <Suspense
            fallback={
              <div className="h-12 w-12 animate-pulse">
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

function HeaderLink({ href, children }: { href: string; children: string }) {
  return (
    <li className="flex hover:underline">
      <Link href={href}>{children}</Link>
    </li>
  )
}

function UserMenu() {
  const { logout } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full bg-white outline-none hover:brightness-95"
          aria-label="User menu">
          <ProfileIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-2 w-48 rounded-lg border bg-white p-2 drop-shadow">
          <DropdownMenu.Item asChild>
            <UserSwitchBtn />
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="m-2 h-px bg-neutral-200" />
          <DropdownMenu.Item asChild>
            <Link
              className="flex rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
              href="/login">
              アカウントを追加
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              className="flex rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
              href="/settings">
              設定
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button
              className="w-full rounded-lg px-3 py-2 text-start font-bold text-red-500 outline-none hover:bg-red-100 active:bg-red-200"
              onClick={() => confirm("ほんまに？") && logout()}>
              ログアウト
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const UserSwitchBtn = () => {
  const { accounts } = useAccounts()
  const current = useLogin()
  const { setAuth } = useAuth()

  const Err = (
    <Link
      className="flex rounded-lg bg-gradient-to-r from-red-500 to-red-400 px-3 py-2 italic text-white outline-none hover:underline"
      href="/help">
      Error
    </Link>
  )

  const AccoutLink = ({ account, children }: { account: Account; children: ReactNode }) =>
    account.host === current?.host && account.token === current?.token ? (
      <Link
        key={account.token}
        className="flex flex-col rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
        href={`/profile?user=@${account.user.username}@${account.host}`}>
        {children}
      </Link>
    ) : (
      <button
        key={account.token}
        className="flex flex-col rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
        onClick={() => setAuth({ account: accounts?.indexOf(account) })}>
        {children}
      </button>
    )

  return (
    // 現在のアカウントを先頭に持ってくる
    [
      current,
      ...(accounts?.filter(a => a.host !== current?.host && a.token !== current?.token) ?? []),
    ].map(account => {
      return (
        account && (
          <AccoutLink account={account} key={account.token}>
            <span className="overflow-hidden text-ellipsis text-lg font-bold">
              {account.user.name}
            </span>
            <span className="overflow-hidden text-ellipsis font-inter text-sm font-bold text-neutral-500">
              @{account.user.username}@{account.host}
            </span>
          </AccoutLink>
        )
      )
    }) || Err
  )
}
