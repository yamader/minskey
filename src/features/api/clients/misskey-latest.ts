import BaseClient from "./base"
import { UserDetail } from "./entities"

export default class MisskeyLatestClient extends BaseClient {
  type: "misskey" = "misskey" as const
  id = "misskey-latest"

  async getEmojiUrl(name: string): Promise<string | null> {
    const json = await this.get(`emoji?name=${name}`)
    return json.url ?? null
  }

  async getMe(): Promise<UserDetail> {
    return await this.get("i")
  }
}
