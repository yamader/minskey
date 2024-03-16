import { atom, useAtom, useAtomValue } from "jotai"
import { Channels, Stream, api } from "misskey-js"
import { use } from "react"
import { accountAtom, useAccount } from "~/features/auth"
import { ensureproto } from "~/utils"
import { APIClient, detect } from "./clients"

// atoms

const clientsAtom = atom<{ [id: string]: APIClient | null }>({})
const clientsFetchAtom = atom<{ [id: string]: Promise<APIClient | null> }>({})

/** @deprecated */
const misskeyJSAtom = atom(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new api.APIClient({
    origin: account.host,
    credential: account.token,
  })
})

/** @deprecated */
const streamConnectAtom = atom(get => {
  const account = get(accountAtom)
  if (!account) return null
  return new Stream(account.host, { token: account.token })
})

// hooks

export function useAPI() {
  const account = useAccount()
  const [clients, setClients] = useAtom(clientsAtom)
  const [clientsFetch, setClientsFetch] = useAtom(clientsFetchAtom)

  if (!account) return null
  const key = account.uid + "@" + account.host

  if (key in clients) return clients[key]

  if (key in clientsFetch) {
    const client = use(clientsFetch[key])
    setClients({ ...clients, [key]: client })
    delete clientsFetch[key]
    setClientsFetch({ ...clientsFetch })
    return client
  }

  const task = detect(account.host, account.token)
  setClientsFetch({ ...clientsFetch, [key]: task })
  return use(task)
}

export function useForeignAPI(host: string) {
  const [clients, setClients] = useAtom(clientsAtom)
  const [clientsFetch, setClientsFetch] = useAtom(clientsFetchAtom)
  const _host = ensureproto(host)

  if (_host in clients) return clients[_host]

  if (_host in clientsFetch) {
    const client = use(clientsFetch[_host])
    setClients({ ...clients, [_host]: client })
    delete clientsFetch[_host]
    setClientsFetch({ ...clientsFetch })
    return client
  }

  const task = detect(_host)
  setClientsFetch({ ...clientsFetch, [_host]: task })
  return use(task)
}

/** @deprecated */
export function useMisskeyJS() {
  return useAtomValue(misskeyJSAtom)
}

/** @deprecated */
export function useStream<T extends keyof Channels>(channel: T) {
  const stream = useAtomValue(streamConnectAtom)
  return stream?.useChannel(channel) ?? null
}
