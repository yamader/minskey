import { signal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { useClient } from '~/features/common'
import { useRouter } from '~/router'
import { persistedSignal } from '~/utils'

export function isSameAccount(a: Account | null, b: Account | null) {
  return a && b && a.uid == b.uid && a.host == b.host
}

export const permissions = [
  'read:account',
  'write:account',
  'read:blocks',
  'write:blocks',
  'read:drive',
  'write:drive',
  'read:favorites',
  'write:favorites',
  'read:following',
  'write:following',
  'read:messaging',
  'write:messaging',
  'read:mutes',
  'write:mutes',
  'write:notes',
  'read:notifications',
  'write:notifications',
  'read:reactions',
  'write:reactions',
  'write:votes',
  'read:pages',
  'write:pages',
  'write:page-likes',
  'read:page-likes',
  'read:user-groups',
  'write:user-groups',
  'read:channels',
  'write:channels',
  'read:gallery',
  'write:gallery',
  'read:gallery-likes',
  'write:gallery-likes',
]

//------------------------------------------------------------//
//  signals
//------------------------------------------------------------//

export type Account = {
  host: string
  uid: string
  token: string
}

export const accountSignal = persistedSignal<Account | null>('minsk::auth::account', null)
export const multiAccountsSignal = persistedSignal<Account[]>('minsk::auth::multiAccounts', [])

type AuthSession = {
  sid: string
  host: string
}

export const authSessionSignal = persistedSignal<AuthSession | null>('minsk::auth::session', null)
export const authErrorSignal = signal<string | null>(null)

const addMultiAccount = (account: Account) => {
  multiAccountsSignal.value = [...multiAccountsSignal.value, account]
}

// -1が渡されることも想定
const removeMultiAccount = (index: number) => {
  multiAccountsSignal.value = [
    ...multiAccountsSignal.value.slice(0, index),
    ...multiAccountsSignal.value.slice(index + 1),
  ]
}

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useAccount() {
  return accountSignal.value
}

// 現在のアカウントを取得する
export function useLogin(login = false) {
  const account = useAccount()
  const router = useRouter()
  const client = useClient()

  useEffect(() => {
    if (login && client && !account) router.push('/')
  }, [login, client, account, router])

  return account
}

export function useAuth() {
  const authAccount = accountSignal.value
  const authSession = authSessionSignal.value
  const authError = authErrorSignal.value
  const { multiAccounts, addMultiAccount, removeMultiAccount } = useMultiAccounts()

  const setAuth = ({
    account,
    session,
    error,
  }: {
    account?: Account | null
    session?: AuthSession | null
    error?: string | null
  }) => {
    if (account !== undefined) accountSignal.value = account
    if (session !== undefined) authSessionSignal.value = session
    if (error !== undefined) authErrorSignal.value = error
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
  return {
    multiAccounts: multiAccountsSignal.value,
    addMultiAccount,
    removeMultiAccount,
  }
}
