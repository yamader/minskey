import { dbg } from "~/libs/utils"

//------------------------------------------------------------//

declare global {
  var _minsk_api_cache: {
    [key: string]: {
      res: Promise<unknown | null>
      issue: number
      lifespan?: number
    }
  }
}

globalThis._minsk_api_cache ??= {}

//------------------------------------------------------------//

type GetProps = Partial<{
  opts: RequestInit
  lifespan: number
}>

type PostProps = Partial<{
  body: unknown
  opts: RequestInit
  lifespan: number
}>

export default class BaseClient {
  id: string
  host: string // プロトコルを含む
  token?: string
  _cachePrefix: string

  // 適当
  getLifespan = 10_000
  getClock = 500
  postLifespan = 10_000
  postClock = 500

  constructor(host: string, token?: string) {
    this.id = "unknown"
    this.host = host
    this.token = token
    this._cachePrefix = host + token
  }

  //----------------------------//
  //  GET
  //----------------------------//

  async get<T>(path: string, props: GetProps, volatile?: boolean) {
    const key = this._cachePrefix + "g" + path + JSON.stringify(props)

    let cacheValid = key in _minsk_api_cache
    if (cacheValid) {
      const { issue, lifespan } = _minsk_api_cache[key]
      const age = Date.now() - issue
      if (lifespan) {
        cacheValid = age < lifespan
      } else {
        if (age > this.getLifespan) cacheValid = false
        if (volatile && age > this.getClock) cacheValid = false
      }
    }

    if (cacheValid) dbg("%c[api::clients::base] cached: " + key, "color:gray")
    else dbg("[api::clients::base] fetch:", key)

    if (!cacheValid) {
      _minsk_api_cache[key] = {
        res: this.rawGet(path, props),
        issue: Date.now(),
        lifespan: props.lifespan,
      }
    }
    return _minsk_api_cache[key].res as Promise<T | null>
  }

  private async rawGet(path: string, { opts }: GetProps) {
    const res = await fetch(this.host + "/api/" + path, opts)
    if (!res.ok) return null
    return res.json()
  }

  //----------------------------//
  //  POST
  //----------------------------//

  async post<T>(path: string, props: PostProps, volatile?: boolean) {
    const key = this._cachePrefix + "p" + path + JSON.stringify(props)

    let cacheValid = key in _minsk_api_cache
    if (cacheValid) {
      const { issue, lifespan } = _minsk_api_cache[key]
      const age = Date.now() - issue
      if (lifespan) {
        cacheValid = age < lifespan
      } else {
        if (age > this.postLifespan) cacheValid = false
        if (volatile && age > this.postClock) cacheValid = false
      }
    }

    if (cacheValid) dbg("%c[api::clients::base] cached: " + key, "color:gray")
    else dbg("[api::clients::base] fetch:", key)

    if (!cacheValid) {
      _minsk_api_cache[key] = {
        res: this.rawPost(path, props),
        issue: Date.now(),
        lifespan: props.lifespan,
      }
    }
    return _minsk_api_cache[key].res as Promise<T | null>
  }

  private async rawPost(path: string, { body, opts }: PostProps) {
    const res = await fetch(this.host + "/api/" + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: this.token,
        ...(body ?? {}),
      }),
      ...opts,
    })
    if (!res.ok) return null
    return res.json()
  }
}
