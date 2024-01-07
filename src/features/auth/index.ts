import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useClient } from "~/features/common"

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

////////////////////////////////////////////////////////////////
//  atoms
////////////////////////////////////////////////////////////////

type Account = {
  proto: string
  host: string
  token: string
}

// FixMe: 理論上、currentAccountAtomにaccountsAtomに存在しない値を代入することができる
export const accountsAtom = atomWithStorage<Account[] | null>("minsk::accounts", null)
export const currentAccountAtom = atomWithStorage<Account | null>("minsk::accounts::currentAccount", null)

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

export function useAuth() {
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom)
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [authError, setAuthError] = useAtom(authErrorAtom)

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
    setAuth({ account: null, session: null, error: null })
  }

  return {
    account: currentAccount,
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
    if (accounts) setAccounts([...accounts, account])
    else setAccounts([account])
  }

  return {
    accounts,
    addAccount,
  }
}

export const useLogin = (login?: boolean) => {
  const currentAccount = useAtomValue(currentAccountAtom)
  const client = useClient()
  const router = useRouter()

  useEffect(() => {
    if (login && client && !currentAccount) router.push("/")
  }, [login, client, currentAccount, router])
  return currentAccount
}
