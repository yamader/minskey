import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useClient } from "~/features/common"

export function isSameAccount(a: Account | null, b: Account | null) {
  return a && b && a.uid == b.uid && a.host == b.host
}

export const permissions = [
  "read:account",
  "write:account",
  "read:blocks",
  "write:blocks",
  "read:drive",
  "write:drive",
  "read:favorites",
  "write:favorites",
  "read:following",
  "write:following",
  "read:messaging",
  "write:messaging",
  "read:mutes",
  "write:mutes",
  "write:notes",
  "read:notifications",
  "write:notifications",
  "read:reactions",
  "write:reactions",
  "write:votes",
  "read:pages",
  "write:pages",
  "write:page-likes",
  "read:page-likes",
  "read:user-groups",
  "write:user-groups",
  "read:channels",
  "write:channels",
  "read:gallery",
  "write:gallery",
  "read:gallery-likes",
  "write:gallery-likes",
]

//------------------------------------------------------------//
//  atoms
//------------------------------------------------------------//

export type Account = {
  host: string
  uid: string
  token: string
}

export const accountAtom = atomWithStorage<Account | null>("minsk::auth::account", null)
export const multiAccountsAtom = atomWithStorage<Account[]>("minsk::auth::multiAccounts", [])

type AuthSession = {
  sid: string
  host: string
}

export const authSessionAtom = atomWithStorage<AuthSession | null>("minsk::auth::session", null)
export const authErrorAtom = atom<string | null>(null)

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useAccount() {
  return useAtomValue(accountAtom)
}

// 現在のアカウントを取得する
export function useLogin(login = false) {
  const account = useAccount()
  const navigate = useNavigate()
  const client = useClient()

  useEffect(() => {
    if (login && client && !account) navigate("/")
  }, [login, client, account, navigate])

  return account
}

export function useAuth() {
  const [authAccount, setAccount] = useAtom(accountAtom)
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [authError, setAuthError] = useAtom(authErrorAtom)
  const { multiAccounts, addMultiAccount, removeMultiAccount } = useMultiAccounts()

  const setAuth = ({
    account,
    session,
    error,
  }: {
    account?: typeof authAccount
    session?: typeof authSession
    error?: typeof authError
  }) => {
    if (account !== undefined) setAccount(account)
    if (session !== undefined) setAuthSession(session)
    if (error !== undefined) setAuthError(error)
  }

  const logout = () => {
    if (multiAccounts.length) {
      const idx = multiAccounts.findIndex(e => isSameAccount(e, authAccount))
      const nextAccount = multiAccounts[idx + 1] ?? multiAccounts[idx - 1] ?? null
      setAuth({ account: nextAccount, session: null, error: null })
      removeMultiAccount(idx)
    } else {
      setAuth({ account: null, session: null, error: null })
    }
  }

  return {
    account: authAccount,
    session: authSession,
    error: authError,
    multiAccounts,
    addMultiAccount,
    setAuth,
    logout,
  }
}

export function useMultiAccounts() {
  const [multiAccounts, setMultiAccounts] = useAtom(multiAccountsAtom)

  const addMultiAccount = (account: Account) => {
    setMultiAccounts([...multiAccounts, account])
  }

  // -1が渡されることも想定
  const removeMultiAccount = (index: number) => {
    setMultiAccounts([...multiAccounts.slice(0, index), ...multiAccounts.slice(index + 1)])
  }

  return { multiAccounts, addMultiAccount, removeMultiAccount }
}
