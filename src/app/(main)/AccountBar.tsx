"use client"

import { Suspense, use } from "react"
import IdStr from "~/components/IdStr"
import { useForeignAPI } from "~/features/api"
import { User } from "~/features/api/clients/entities"
import { Account } from "~/features/auth"
import { CustomEmojiStr } from "~/features/common/CustomEmoji"
import UesrStatusIcon from "~/features/user/UserStatusIcon"
import { hostname } from "~/utils"

// todo: ユーザキャッシュを参照するなど
export default function AccountBar({
  account,
  omake,
}: {
  account: Account | null
  omake: React.ReactNode
}) {
  return (
    <div className="flex w-full items-center gap-2.5 text-black">
      <Suspense fallback={<AccountBarContent user={null} account={account} />}>
        {account ? (
          <AccountBarFetch account={account} />
        ) : (
          <AccountBarContent user={null} account={account} />
        )}
      </Suspense>
      {omake && <div className="ml-auto">{omake}</div>}
    </div>
  )
}

function AccountBarFetch({ account }: { account: Account }) {
  const api = useForeignAPI(account.host)
  const fetch = api?.showId(account.uid, account.host)
  return <AccountBarContent user={fetch && use(fetch)} account={account} />
}

function AccountBarContent({ user, account }: { user: User | null; account: Account | null }) {
  const _host = user?.host ?? account?.host
  const host = _host && hostname(_host)

  return (
    <>
      <UesrStatusIcon user={user} />
      {user ? (
        <div className="truncate">
          <div className="truncate font-medium">
            <CustomEmojiStr text={user.name ?? ""} />
          </div>
          <div className="truncate text-xs">
            <IdStr username={user.username} host={host!} />
          </div>
        </div>
      ) : (
        <div className="flex animate-pulse flex-col gap-1 truncate">
          <div className="h-4 w-16 rounded-full bg-slate-300" />
          <div className="h-3 w-32 rounded-full bg-slate-300 " />
        </div>
      )}
    </>
  )
}
