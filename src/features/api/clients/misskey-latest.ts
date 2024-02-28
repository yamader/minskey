import BaseClient from "./base"

export default class MisskeyLatestClient extends BaseClient {
  type: "misskey" = "misskey"

  async fetchEmojiUrl(name: string): Promise<string | null> {
    const json = await this.get(`emoji?name=${name}`)
    return json.url ?? null
  }
}
