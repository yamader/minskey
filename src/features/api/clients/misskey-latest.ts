import BaseClient from "./base"
import { UserDetail } from "./entities"

export default class MisskeyLatestClient extends BaseClient {
  type: "misskey" = "misskey" as const
  id = "misskey-latest"

  async getEmojiUrl(name: string): Promise<string | null> {
    const json = await this.get(`emoji?name=${name}`)
    return json.url ?? null
  }

  getMe() {
    return this.post("i") as Promise<UserDetail>
  }

  ping() {
    return this.get("ping") as Promise<{ pong: number }>
  }
}
