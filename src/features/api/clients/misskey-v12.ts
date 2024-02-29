import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV12Client extends MisskeyLatestClient {
  override async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.post("meta")
    if (!emojis || typeof emojis.find !== "function") return null
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      emojis.find((e: any) => {
        if (!e) return false
        e.name == name
      })?.url ?? null
    )
  }
}
