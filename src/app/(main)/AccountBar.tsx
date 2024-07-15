import { atom, useAtomValue, useSetAtom } from "jotai"
import { Suspense, use } from "react"
import IdStr from "~/components/IdStr"
import { useForeignAPI } from "~/features/api"
import { Account } from "~/features/auth"
import { CustomEmojiStr } from "~/features/common/CustomEmoji"
import { User } from "~/features/user"
import UesrStatusIcon from "~/features/user/UserStatusIcon"
import { hostname } from "~/utils"

const acct2UserAtom = atom<{ [key: string]: User }>({})

// features/api/index.tsにも似たようなのがある
function acct2Key(account: Account) {
  return account.uid + "@" + account.host
}

export default function AccountBar({
  account,
  omake,
}: {
  account: Account
  omake: React.ReactNode
}) {
  const acct2User = useAtomValue(acct2UserAtom)
  const key = acct2Key(account)

  return (
    <div className="flex w-full items-center gap-2.5 text-black">
      <Suspense fallback={<AccountBarContent user={null} account={account} />}>
        {key in acct2User ? (
          <AccountBarContent user={acct2User[key]} account={account} />
        ) : (
          <AccountBarFetch account={account} />
        )}
      </Suspense>
      {omake && <div className="ml-auto">{omake}</div>}
    </div>
  )
}

function AccountBarFetch({ account }: { account: Account }) {
  const api = useForeignAPI(account.host)
  const setAccount2User = useSetAtom(acct2UserAtom)

  const fetch = api?.showId(account.uid, account.host)
  const user = fetch && use(fetch)

  if (user) setAccount2User(prev => ({ ...prev, [acct2Key(account)]: user }))

  return <AccountBarContent user={user} account={account} />
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
          <div className="h-3 w-32 rounded-full bg-slate-300" />
        </div>
      )}
    </>
  )
}
