import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV13Client extends MisskeyLatestClient {
  override async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.get("emojis")
    return emojis.find((e: any) => e.name == name)?.url ?? null
  }
}
