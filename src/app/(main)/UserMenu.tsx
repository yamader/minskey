"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { Suspense } from "react"
import Button from "~/components/Button"
import { useAuth } from "~/features/auth"
import { useProfile } from "~/features/profile"
import UesrStatusIcon from "~/features/profile/UserStatusIcon"
import { hostname } from "~/utils"

export default function UserMenu() {
  return (
    <Suspense>
      <UserMenuSuspense />
    </Suspense>
  )
}

function UserMenuSuspense() {
  const { account, logout } = useAuth()
  const profile = useProfile()

  const _host = profile?.host ?? account?.host
  const host = _host && hostname(_host)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {account ? (
          <button
            className="rounded-full bg-white outline-none hover:brightness-95"
            aria-label="User menu">
            <UesrStatusIcon />
          </button>
        ) : (
          <Button>ログイン</Button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-2 w-48 rounded-lg border bg-white p-2 drop-shadow">
          <DropdownMenu.Item asChild>
            {profile ? (
              <Link
                className="flex flex-col rounded-lg px-3 py-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
                href={`/profile?user=@${profile.username}@${host}`}>
                <span className="overflow-hidden text-ellipsis text-lg font-bold">
                  {profile.name}
                </span>
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
