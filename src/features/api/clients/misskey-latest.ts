import BaseClient from "./base"
import { Note, UserDetail } from "./entities"

// Notes
type NotesOpts = {
  local?: boolean
  reply?: boolean
  renote?: boolean
  withFiles?: boolean
  poll?: boolean
  limit?: number
  sinceId?: string
  untilId?: string
}
type NotesResponse = Note[]

// Note
type NoteResponse = Note

// Replies
type RepliesResponse = Note[]
type RepliesOpts = {
  limit?: number
  sinceId?: string
  untilId?: string
}

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

  async showNote(noteId: string) {
    return this.post<NoteResponse>("notes/show", {
      body: { noteId },
    })
  }

  async noteReplies(noteId: string, opts: RepliesOpts = {}) {
    return this.post<RepliesResponse>("notes/replies", {
      body: { noteId, ...opts },
    })
  }
}
