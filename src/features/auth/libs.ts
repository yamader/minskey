import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useRouter } from "next/navigation"

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
export const authErrorAtom = atom("")

// hooks

export function useLogin(login?: boolean) {
  const account = useAtomValue(accountAtom)
  const router = useRouter()
  if (login && !account) router.push("/login")
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
    setAuth({ account: null, session: null, error: "" })
  }

  return {
    account: authAccount,
    session: authSession,
    error: authError,
    setAuth,
    logout,
  }
}
