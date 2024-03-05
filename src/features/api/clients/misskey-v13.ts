import { Emoji } from ".."
import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV13Client extends MisskeyLatestClient {
  id = "misskey-v13"

  override async getEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.get("emojis")
    return emojis?.find?.((e: Record<keyof Emoji, unknown>) => e.name == name)?.url ?? null
  }
}
