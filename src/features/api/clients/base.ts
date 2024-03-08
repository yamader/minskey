export default class BaseClient {
  id: string
  host: string
  token?: string

  constructor(host: string, token?: string) {
    this.id = "unknown"
    this.host = host
    this.token = token
  }

  get(path: string, opts?: RequestInit) {
    return fetch(this.host + "/api/" + path, opts).then(res => res.json())
  }

  post(path: string, opts?: RequestInit, body?: unknown) {
    return fetch(this.host + "/api/" + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i: this.token,
        ...(body ?? {}),
      }),
      ...opts,
    }).then(res => res.json())
  }

  requireToken() {
    if (!this.token) {
      throw new Error("token required")
    }
  }
}
