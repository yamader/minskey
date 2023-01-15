import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { api, entities } from "misskey-js"

type Account = {
  origin: string
  credential: string
}

type AuthSession = {
  id: string
  host: string
}

export const accountAtom = atomWithStorage<Account | null>("account", null)

export const authSessionAtom = atomWithStorage<AuthSession | null>("authSession", null)

export const apiAtom = atom<api.APIClient | null>(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new api.APIClient(account)
})

export const profileAtom = atom<Promise<entities.UserLite | null>>(async () => {
  return null
})
