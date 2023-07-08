import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useClient } from "~/libs/utils"

// types

type Account = {
  proto: string
  host: string
  token: string
}

type AuthSession = {
  id: string
  proto: string
  host: string
}

// atoms

export const accountAtom = atomWithStorage<Account | null>("minsk::account::v1", null)

export const authSessionAtom = atomWithStorage<AuthSession | null>("minsk::authSession", null)
export const authErrorAtom = atom<string | null>(null)

// hooks

export function useLogin(login?: boolean) {
  const account = useAtomValue(accountAtom)
  const router = useRouter()
  const client = useClient()

  useEffect(() => {
    if (login && client && !account) router.push("/")
  }, [login, client, account, router])

  return account
}

export function useAuth() {
  const [authAccount, setAccount] = useAtom(accountAtom)
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [authError, setAuthError] = useAtom(authErrorAtom)

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
    setAuth({ account: null, session: null, error: null })
  }

  return {
    account: authAccount,
    session: authSession,
    error: authError,
    setAuth,
    logout,
  }
}
