import { dbg } from "~/utils"

/**
 * 各バージョンごとに異なるAPIクライアントを作成するための基底クラス
 */

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
  host: string
  token?: string

  // 適当
  getLifespan = 10_000
  getClock = 500
  postLifespan = 10_000
  postClock = 500

  private cache: {
    [key: string]: {
      res: Promise<unknown | null>
      issue: number
      lifespan?: number
    }
  }

  /**
   * @param host - プロトコルを含むホスト名
   * @param token - APIトークン
   * @memberof BaseClient
   */
  constructor(host: string, token?: string) {
    this.id = "unknown"
    this.host = host
    this.token = token
    this.cache = {}
  }

  /**
   * GETリクエストを送信する
   * @param path - APIのパス
   * @param opts - fetchのオプション
   * @memberof BaseClient
   */
  async get<T>(path: string, props: GetProps = {}, volatile?: boolean) {
    const key = "g" + path + JSON.stringify(props)

    let cacheValid = key in this.cache
    if (cacheValid) {
      const { issue, lifespan } = this.cache[key]
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
      this.cache[key] = {
        res: this.realGet<T>(path, props),
        issue: Date.now(),
        lifespan: props.lifespan,
      }
    }
    return this.cache[key].res as Promise<T | null>
  }

  private async realGet<T>(path: string, { opts }: GetProps) {
    const res = await fetch(this.host + "/api/" + path, opts)
    if (!res.ok) return null
    return res.json() as Promise<T>
  }

  /**
   * POSTリクエストを送信する
   * @param path - APIのパス
   * @param body - リクエストボディ
   * @param opts - fetchのオプション
   * @memberof BaseClient
   */
  async post<T>(path: string, props: PostProps = {}, volatile?: boolean) {
    const key = "p" + path + JSON.stringify(props)

    let cacheValid = key in this.cache
    if (cacheValid) {
      const { issue, lifespan } = this.cache[key]
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
      this.cache[key] = {
        res: this.realPost(path, props),
        issue: Date.now(),
        lifespan: props.lifespan,
      }
    }
    return this.cache[key].res as Promise<T | null>
  }

  private async realPost<T>(path: string, { body, opts }: PostProps) {
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
    return res.json() as Promise<T>
  }
}
