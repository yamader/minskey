"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { Suspense } from "react"

import { useAccounts, useAuth, useLogin } from "~/features/auth"
import BrandLogo from "~/features/common/BrandLogo"
import LinkButton from "~/features/common/LinkButton"
import { useProfile } from "~/features/profile"
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
  const { account, logout } = useAuth()
  const { accounts } = useAccounts()
  const profile = useProfile()

  console.log(accounts)

  const host = profile?.host ?? account?.host

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
            {profile ? (
              <Link
                className="flex flex-col rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
                href={`/profile?user=@${profile.username}@${host}`}>
                <span className="overflow-hidden text-ellipsis text-lg font-bold">{profile.name}</span>
                <span className="overflow-hidden text-ellipsis font-inter text-sm font-bold text-neutral-500">
                  @{profile.username}@{host}
                </span>
              </Link>
            ) : (
              <Link
                className="flex rounded-lg bg-gradient-to-r from-red-500 to-red-400 px-3 py-2 italic text-white outline-none hover:underline"
                href="/help">
                Error
              </Link>
            )}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="m-2 h-px bg-neutral-200" />
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
