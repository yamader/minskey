import BaseClient from "./base"
import { UserDetail } from "./entities"

export default class MisskeyLatestClient extends BaseClient {
  type: "misskey" = "misskey" as const
  id = "misskey-latest"

  async getEmojiUrl(name: string) {
    const json = await this.get<{ url: string }>(`emoji?name=${name}`)
    return json?.url ?? null
  }

  async getMe() {
    return this.post<UserDetail>("i")
  }

  async ping() {
    return this.get<{ pong: number }>("ping")
  }

  async show(username: string, host: string | null = null) {
    return this.post<any>(`users/show`, { username, host })
  }

  async notes(userId: string, opts: {} = {}) {
    return this.post<any>("notes", { userId, ...opts })
  }
}
