import MisskeyLatestClient from "./misskey-latest"

export default class MisskeyV12Client extends MisskeyLatestClient {
  override async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.post("meta")
    if (!emojis || !Object.keys(emojis).includes("find")) return null
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      emojis.find((e: any) => {
        Object.keys(e).includes("name") && e.name == name
      })?.url ?? null
    )
  }
}
