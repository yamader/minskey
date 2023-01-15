import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useAtom } from "jotai"
import Link from "next/link"
import { Suspense } from "react"

import FallbackIcon from "~/components/FallbackIcon"
import ImgIcon from "~/components/ImgIcon"
import LinkButton from "~/components/LinkButton"
import { accountAtom, profileAtom } from "~/libs/atoms"

export default function CommonHeader() {
  const [profile] = useAtom(profileAtom)
  const [, setAccount] = useAtom(accountAtom)

  return (
    <header className="flex h-16 items-center justify-between">
      <div />
      <Suspense fallback={<FallbackIcon />}>
        {profile ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="overflow-hidden rounded-full outline-none hover:brightness-90" aria-label="User menu">
                <ImgIcon src={profile.avatarUrl} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="m-2 w-52 rounded-lg border border-black bg-white p-2 drop-shadow">
                <DropdownMenu.Item asChild>
                  <Link
                    className="flex flex-col rounded-lg p-2 outline-none hover:bg-neutral-100 active:bg-neutral-200"
                    href={`/profile?user=@${profile.username}@${profile.host}`}>
                    <span className="overflow-hidden text-ellipsis text-lg font-bold">{profile.name}</span>
                    <span className="overflow-hidden text-ellipsis font-inter text-sm font-bold text-neutral-500">
                      @{profile.username}@{profile.host}
                    </span>
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="m-2 h-px bg-neutral-300" />
                <DropdownMenu.Item asChild>
                  <Link
                    className="flex rounded-lg py-2 px-4 outline-none hover:bg-neutral-100 active:bg-neutral-200"
                    href="/settings">
                    設定
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="rounded-lg px-4 py-2 font-bold text-red-500 outline-none hover:bg-red-100 active:bg-red-200"
                  onClick={() => setAccount(null)}>
                  ログアウト
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <LinkButton href="/login">Login</LinkButton>
        )}
      </Suspense>
    </header>
  )
}
