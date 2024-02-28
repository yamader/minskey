import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV12Client extends MisskeyLatestClient {
  override async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.post("meta")
    return emojis.find((e: any) => e.name == name)?.url ?? null
  }
}
