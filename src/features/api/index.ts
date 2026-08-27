import { signal } from "@preact/signals"
import { Emitter } from "mitt"
import { useEffect, useRef } from "preact/hooks"
import { Account, useAccount } from "~/features/auth"
import { ensureproto } from "~/utils"
import { APIClient, MisskeyChannels, MisskeyStream, detect } from "./clients"

// なんかいい名前無いかな
function account2ClientIdx(account: Account) {
  return account.uid + "@" + account.host
}

//------------------------------------------------------------//
//  signals
//------------------------------------------------------------//

const clientsSignal = signal<{ [id: string]: APIClient | null }>({})

//------------------------------------------------------------//
//  hooks
//------------------------------------------------------------//

export function useAPI() {
  const account = useAccount()
  const clients = clientsSignal.value
  const key = account && account2ClientIdx(account)

  useEffect(() => {
    if (!key || key in clients) return
    detect(account.host, account.token).then(client => {
      clientsSignal.value = { ...clientsSignal.value, [key]: client }
    })
  }, [key, clients, account])

  return key ? (clients[key] ?? null) : null
}

export function useForeignAPI(host: string) {
  const clients = clientsSignal.value
  const _host = ensureproto(host)

  useEffect(() => {
    if (_host in clients) return
    detect(_host).then(client => {
      clientsSignal.value = { ...clientsSignal.value, [_host]: client }
    })
  }, [_host, clients])

  return clients[_host] ?? null
}

export function useChannel(chanName: keyof MisskeyChannels, params = {}) {
  // todo:整理
  type Chan = {
    id: string
    chan: Emitter<any>
    off: () => void
    send: (type: string, body: Object) => void
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
