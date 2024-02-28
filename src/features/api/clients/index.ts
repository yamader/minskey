import MisskeyLatestClient from "./misskey-latest"
import MisskeyV12Client from "./misskey-v12"
import MisskeyV13Client from "./misskey-v13"

export type APIClient = MisskeyLatestClient

// host: `scheme:auth` ← ここ重要
export async function detect(host: string, token?: string): Promise<APIClient | null> {
  try {
    const res = await fetch(host + "/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })
    if (res.ok) {
      const { version } = await res.json()
      const [major, minor] = (version as String).split(".").map(Number)
      let ctor = MisskeyLatestClient
      switch (true) {
        case major < 13:
          ctor = MisskeyV12Client
          break
        case major == 13 && minor < 10:
          ctor = MisskeyV13Client
          break
      }
      return new ctor(host, token)
    }
  } catch (e) {
    console.error(e)
  }

  return null
}
