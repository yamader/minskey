import { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useForeignAPI } from '~/features/api'
import { Account } from '~/features/auth'
import { CustomEmojiStr } from '~/features/common/CustomEmoji'
import { User } from '~/features/user'
import UesrStatusIcon from '~/features/user/UserStatusIcon'
import { hostname } from '~/utils'
import IdStr from './IdStr'

export default function AccountBar({ account, omake }: { account: Account; omake: ComponentChildren }) {
  const api = useForeignAPI(account.host)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (api) api.showId(account.uid, account.host).then(u => setUser(u ?? null))
  }, [api, account.uid, account.host])

  return (
    <div className="flex w-full items-center gap-2.5 text-black">
      <AccountBarContent user={user} account={account} />
      {omake && <div className="ml-auto">{omake}</div>}
    </div>
  )
}

function AccountBarContent({ user, account }: { user: User | null; account: Account | null }) {
  const _host = user?.host ?? account?.host
  const host = hostname(_host ?? '')

  return (
    <>
      <UesrStatusIcon user={user} />
      {user ? (
        <div className="truncate">
          <div className="truncate font-medium">
            <CustomEmojiStr text={user.name ?? ''} />
          </div>
          <div className="truncate text-xs">
            <IdStr username={user.username} host={host} />
          </div>
        </div>
      ) : (
        <div className="flex animate-pulse flex-col gap-1 truncate">
          <div className="h-4 w-16 rounded-full bg-slate-300" />
          <div className="h-3 w-32 rounded-full bg-slate-300" />
        </div>
      )}
    </>
  )
}
