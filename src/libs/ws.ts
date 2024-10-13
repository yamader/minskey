import { dbg, sleep } from "~/libs/utils"

export class HandyWebSocket {
  url: string
  sock!: WebSocket

  constructor(url: string) {
    this.url = url
    this.init()
  }

  private init() {
    this.sock = new WebSocket(this.url)

    this.sock.onclose = () => {
      dbg("[ws] closed")
      setTimeout(() => {
        dbg(`[ws] reconnecting to ${this.url} ...`)
        this.init()
      }, 1000)
    }
  }

  async safetySend(data: string) {
    while (!this.sock.readyState) await sleep(100)
    dbg(`%c[ws] send: ${data}`, "color:gray")
    this.sock.send(data)
  }
}
