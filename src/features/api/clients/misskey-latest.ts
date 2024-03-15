import BaseClient from "./base"
import { Note, UserDetail } from "./entities"

interface NotesOpts {
  local?: boolean
  reply?: boolean
  renote?: boolean
  withFiles?: boolean
  poll?: boolean
  limit?: number
  sinceId?: string
  untilId?: string
}

interface NotesResponse extends Array<Note> {}

export default class MisskeyLatestClient extends BaseClient {
  type: "misskey" = "misskey" as const
  id = "misskey-latest"

  async emojiUrl(name: string) {
    const json = await this.get<{ url: string }>(`emoji?name=${name}`)
    return json?.url ?? null
  }

  /**
   * ユーザー情報を取得します
   * @memberof MisskeyLatestClient
   */
  async me() {
    return this.post<UserDetail>("i")
  }

  /**
   * サーバーにpingを送信します
   */
  async ping() {
    return this.get<{ pong: number }>("ping")
  }

  /**
   * ユーザー情報を取得します
   * @memberof MisskeyLatestClient
   */
  async show(username: string, host: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.post<any>(`users/show`, { username, host })
  }

  /**
   * ノートを取得します
   * @param userId - 対象のユーザーID
   * @param opts - オプション
   * @returns
   */
  async notes(userId: string, opts: NotesOpts = {}) {
    return this.post<NotesResponse>("notes", { userId, ...opts })
  }
}
