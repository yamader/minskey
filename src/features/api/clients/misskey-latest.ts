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

interface MentionsOpts {
  following?: boolean
  limit?: number
  sinceId?: string
  untilId?: string
  visibility?: Note["visibility"]
}
interface MentionsResponse extends Array<Note> {}

export default class MisskeyLatestClient extends BaseClient {
  type: "misskey" = "misskey" as const
  id = "misskey-latest"

  /**
   * サーバーから絵文字のURLを取得
   * @param name - 絵文字の名前
   * @memberof MisskeyLatestClient
   */
  async emojiUrl(name: string) {
    const json = await this.get<{ url: string }>(`emoji?name=${name}`, {})
    return json?.url ?? null
  }

  /**
   * ユーザー情報を取得
   * @memberof MisskeyLatestClient
   */
  async me() {
    return this.post<UserDetail>("i", {})
  }

  /**
   * サーバーにpingを送信
   */
  async ping() {
    return this.get<{ pong: number }>("ping", {}, true)
  }

  async showId(userId: string, host: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.post<any>(`users/show`, {
      body: { userId, host },
    })
  }

  /**
   * ユーザー情報を取得
   * @memberof MisskeyLatestClient
   */
  async showName(username: string, host: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.post<any>(`users/show`, {
      body: { username, host },
    })
  }

  /**
   * ノートを取得
   * @param userId - 対象のユーザーID
   * @param opts - オプション
   * @returns
   */
  async userNotes(userId: string, opts: NotesOpts = {}) {
    return this.post<NotesResponse>("users/notes", {
      body: { userId, ...opts },
    })
  }

  async mentions(opts: MentionsOpts = {}) {
    return this.post<MentionsResponse>("notes/mentions", opts)
  }

  async directMessage(opts: Omit<MentionsOpts, "visibility"> = {}) {
    return this.post<MentionsResponse>("notes/mentions", { visibility: "specified", ...opts })
  }
}
