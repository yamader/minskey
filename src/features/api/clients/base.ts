/**
 * 各バージョンごとに異なるAPIクライアントを作成するための基底クラス
 */

export default class BaseClient {
  id: string
  host: string
  token?: string

  /**
   * @param host - プロトコルを含むホスト名
   * @param token - APIトークン
   * @memberof BaseClient
   */
  constructor(host: string, token?: string) {
    this.id = "unknown"
    this.host = host
    this.token = token
  }

  /**
   * GETリクエストを送信する
   * @param path - APIのパス
   * @param opts - fetchのオプション
   * @memberof BaseClient
   */
  async get<T>(path: string, opts?: RequestInit) {
    const res = await fetch(this.host + "/api/" + path, opts)
    if (!res.ok) return null
    return (await res.json()) as T
  }

  /**
   * POSTリクエストを送信する
   * @param path - APIのパス
   * @param body - リクエストボディ
   * @param opts - fetchのオプション
   * @memberof BaseClient
   */
  async post<T>(path: string, body?: unknown, opts?: RequestInit) {
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
    return (await res.json()) as T
  }
}
