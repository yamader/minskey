import { Emoji } from ".."
import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV12Client extends MisskeyLatestClient {
  id = "misskey-v12"

  override async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.post("meta")
    return emojis?.find?.((e: Record<keyof Emoji, unknown>) => e.name == name)?.url ?? null
  }
}
