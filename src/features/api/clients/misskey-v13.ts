import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV13Client extends MisskeyLatestClient {
  override async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.get("emojis")
    if (!emojis) return null
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      emojis.find((e: any) => {
        if (!e) return false
        return e.name == name
      })?.url ?? null
    )
  }
}
