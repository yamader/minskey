import { atom, useAtom } from "jotai"
import { Emitter } from "mitt"
import { use, useEffect, useRef } from "react"
import { Account, useAccount } from "~/features/auth"
import { ensureproto } from "~/libs/utils"
import { APIClient, MisskeyChannels, MisskeyStream, detect } from "./clients"

// なんかいい名前無いかな
function account2ClientIdx(account: Account) {
  return account.uid + "@" + account.host
}

//------------------------------------------------------------//
//  atoms
//------------------------------------------------------------//

const clientsAtom = atom<{ [id: string]: APIClient | null }>({})
const clientsFetchAtom = atom<{ [id: string]: Promise<APIClient | null> }>({})

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useAPI() {
  const account = useAccount()
  const [clients, setClients] = useAtom(clientsAtom)
  const [clientsFetch, setClientsFetch] = useAtom(clientsFetchAtom)

  if (!account) return null
  const key = account2ClientIdx(account)

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

export function useChannel(chanName: keyof MisskeyChannels, params = {}) {
  // todo:整理
  type Chan = {
    id: string
    chan: Emitter<any>
    off: () => void
    send: (type: string, body: object) => void
  }

  // todo: ウンコード直す
  const api = useAPI()
  const chanCache = useRef<Chan>()
  useEffect(() => {
    if (api) {
      chanCache.current = api.channel(chanName, params)
      return chanCache.current.off
    }
  }, [api, chanName])
  return chanCache.current?.chan ?? null
}

export function useStream(
  type: keyof MisskeyStream,
  handler: (body: MisskeyStream[typeof type]) => void, // 再render要検証
) {
  // todo: 整理
  type Stream = { off: () => void }

  const api = useAPI()
  const streamCache = useRef<Stream>()
  useEffect(() => {
    if (api) {
      streamCache.current = api.stream(type, handler)
      return streamCache.current.off
    }
  }, [api, type, handler])
}
