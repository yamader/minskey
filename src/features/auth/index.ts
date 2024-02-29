import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { User } from "misskey-js/built/entities"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useClient } from "~/features/common"

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

////////////////////////////////////////////////////////////////
//  atoms
////////////////////////////////////////////////////////////////

export type Account = {
  proto: string
  host: string
  token: string
  user: User
}

export const accountsAtom = atomWithStorage<Account[] | null>("minsk::accounts", null)
export const currentAccountIndexAtom = atomWithStorage<number | null>(
  "minsk::accounts::current",
  null,
)

type AuthSession = {
  id: string
  proto: string
  host: string
}

export const authSessionAtom = atomWithStorage<AuthSession | null>("minsk::auth::session", null)

export const authErrorAtom = atom<string | null>(null)

////////////////////////////////////////////////////////////////
//  hooks
////////////////////////////////////////////////////////////////

// 現在のアカウントを取得する
export const useLogin = (login?: boolean) => {
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountIndexAtom)
  const accounts = useAtomValue(accountsAtom)
  const client = useClient()
  const router = useRouter()

  useEffect(() => {
    if (accounts && !currentAccount) setCurrentAccount(0)
    if (login && client && (!accounts || currentAccount == null)) router.push("/")
  }, [login, client, currentAccount, router, accounts])
  return accounts ? accounts[currentAccount ?? 0] : null
}

export function useAuth() {
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountIndexAtom)
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [authError, setAuthError] = useAtom(authErrorAtom)
  const { accounts, removeAccount } = useAccounts()

  const setAuth = ({
    account,
    session,
    error,
  }: {
    account?: typeof currentAccount
    session?: typeof authSession
    error?: typeof authError
  }) => {
    if (account !== undefined) setCurrentAccount(account)
    if (session !== undefined) setAuthSession(session)
    if (error !== undefined) setAuthError(error)
  }

  const logout = () => {
    if (currentAccount !== null) removeAccount(currentAccount)

    if (accounts && accounts.length >= 1) {
      setAuth({ account: 0, session: null, error: null })
    } else {
      setCurrentAccount(null)
      setAuth({ account: null, session: null, error: null })
    }
  }

  return {
    account: accounts ? accounts[currentAccount ?? 0] : null,
    session: authSession,
    error: authError,
    setAuth,
    logout,
  }
}

export function useAccounts(login?: boolean) {
  const [accounts, setAccounts] = useAtom(accountsAtom)

  const router = useRouter()
  const client = useClient()

  useEffect(() => {
    if (login && client && !accounts) router.push("/")
  }, [login, client, accounts, router])

  const addAccount = (account: ArrElement<NonNullable<typeof accounts>>) => {
    console.log("addAccount", account)
    if (accounts) setAccounts([...accounts, account])
    else setAccounts([account])
  }

  const removeAccount = (index: number) => {
    if (accounts) {
      const newAccounts = accounts.filter((_, i) => i !== index)
      setAccounts(newAccounts)
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
  }
}
