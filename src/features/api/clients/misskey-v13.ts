import { Emoji } from "../types"
import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV13Client extends MisskeyLatestClient {
  id = "misskey-v13"

  override async emojiUrl(name: string): Promise<string | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { emojis } = await super.get<any>("emojis")
    return emojis?.find?.((e: Record<keyof Emoji, unknown>) => e.name == name)?.url ?? null
  }
}
