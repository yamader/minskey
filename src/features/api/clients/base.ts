export default class BaseClient {
  id: string
  host: string
  token?: string

  constructor(host: string, token?: string) {
    this.id = "unknown"
    this.host = host
    this.token = token
  }

  async get<T>(path: string, opts?: RequestInit) {
    const res = await fetch(this.host + "/api/" + path, opts)
    if (!res.ok) return null
    return (await res.json()) as T
  }

  async post<T>(path: string, body?: unknown, opts?: RequestInit) {
    const res = await fetch(this.host + "/api/" + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: this.token,
        ...(body ?? {}),
      }),
      ...opts,
    })
    if (!res.ok) return null
    return (await res.json()) as T
  }
}
