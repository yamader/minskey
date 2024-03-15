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

  async emojiUrl(name: string) {
    const json = await this.get<{ url: string }>(`emoji?name=${name}`)
    return json?.url ?? null
  }

  async me() {
    return this.post<UserDetail>("i")
  }

  async ping() {
    return this.get<{ pong: number }>("ping")
  }

  async show(username: string, host: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.post<any>(`users/show`, { username, host })
  }

  async notes(userId: string, opts: NotesOpts = {}) {
    return this.post<NotesResponse>("notes", { userId, ...opts })
  }

  async mentions(opts: MentionsOpts = {}) {
    return this.post<MentionsResponse>("notes/mentions", opts)
  }

  async directMessage(opts: Omit<MentionsOpts, "visibility"> = {}) {
    return this.post<MentionsResponse>("notes/mentions", { visibility: "specified", ...opts })
  }
}
