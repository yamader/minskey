import { Emoji } from "~/features/common"
import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV12Client extends MisskeyLatestClient {
  id = "misskey-v12"

  override async emojiUrl(name: string): Promise<string | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { emojis } = await super.post<any>("meta", {})
    return emojis?.find?.((e: Record<keyof Emoji, unknown>) => e.name == name)?.url ?? null
  }
}
