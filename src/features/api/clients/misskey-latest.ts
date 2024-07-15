import mitt from "mitt"
import { v4 as uuidv4 } from "uuid"
import { Note } from "~/features/note"
import { Notification } from "~/features/notification"
import { TLNames } from "~/features/timeline"
import { User } from "~/features/user"
import { dbg } from "~/utils"
import { HandyWebSocket } from "~/ws"
import { MisskeyChannels, MisskeyStream } from "."
import BaseClient from "./base"

type NotesOpts = {
  limit?: number // upto 100?
  sinceId?: string
  untilId?: string
}

export default class MisskeyLatestClient extends BaseClient {
  type = "misskey" as const
  id = "misskey-latest"

  //----------------------------//
  //  REST(?)
  //----------------------------//

  async emojiUrl(name: string) {
    const json = await this.get<{ url: string }>(`emoji?name=${name}`, {})
    return json?.url ?? null
  }

  async ping() {
    return this.get<{ pong: number }>("ping", {}, true)
  }

  // i

  async me() {
    return this.post<User>("i", {})
  }

  async notifications(
    opts: {
      limit?: number // upto 100?
      sinceId?: string
      untilId?: string
    } = {},
  ) {
    return this.post<Notification[]>("i/notifications", {
      body: opts,
    })
  }

  // users

  async showId(userId: string, host: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.post<any>(`users/show`, {
      body: { userId, host },
    })
  }

  async showName(username: string, host: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.post<any>(`users/show`, {
      body: { username, host },
    })
  }

  async userNotes(
    userId: string,
    opts: {
      local?: boolean
      reply?: boolean
      renote?: boolean
      withFiles?: boolean
      poll?: boolean
      limit?: number
      sinceId?: string
      untilId?: string
    } = {},
  ) {
    return this.post<Note[]>("users/notes", {
      body: { userId, ...opts },
    })
  }

  // notes

  async notes(tl: TLNames, opts: NotesOpts = {}) {
    let endpoint = tl.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    if (tl == "homeTimeline") endpoint = "timeline"
    return this.post<Note[]>(`notes/${endpoint}`, {
      body: opts,
    })
  }

  async showNote(noteId: string) {
    return this.post<Note>("notes/show", {
      body: { noteId },
    })
  }

  async createNote(note: Partial<Note>) {
    return this.post<{ createdNote: Note }>("notes/create", {
      body: note,
    })
  }

  async reactNote(noteId: string, reaction: string) {
    return this.post<void>("notes/reactions/create", {
      body: { noteId, reaction },
    })
  }

  async unReactNote(noteId: string) {
    return this.post<void>("notes/reactions/delete", {
      body: { noteId },
    })
  }

  async noteRenotes(noteId: string, opts: NotesOpts = {}) {
    return this.post<Note[]>("notes/renotes", {
      body: { noteId, ...opts },
    })
  }

  async noteReplies(noteId: string, opts: NotesOpts = {}) {
    return this.post<Note[]>("notes/replies", {
      body: { noteId, ...opts },
    })
  }

  //----------------------------//
  //  socket
  //----------------------------//

  private streamChan = mitt<MisskeyStream>()
  private chanChan = mitt<any>() // ﾁｬﾝﾁｬﾝ♪

  private _ws: HandyWebSocket | undefined
  private get ws() {
    if (!this._ws) {
      const host =
        this.host.replace("http://", "ws://").replace("https://", "wss://") +
        `/streaming?i=${this.token}`
      this._ws = new HandyWebSocket(host)
      this._ws.sock.onmessage = this.msgHandler.bind(this)
    }
    return this._ws
  }

  protected msgHandler(ev: { data: string }) {
    const msg = JSON.parse(ev.data)
    if (msg.type == "channel") {
      const { id } = msg.body
      this.chanChan.emit(id, msg.body)
    } else {
      this.streamChan.emit(msg.type, msg.body)
    }
  }

  stream(type: keyof MisskeyStream, handler: (body: MisskeyStream[typeof type]) => void) {
    this.streamChan.on(type, handler)
    return {
      off: () => this.streamChan.off(type, handler),
    }
  }

  channel(channel: keyof MisskeyChannels, params = {}) {
    const id = uuidv4()
    const chan = mitt<any>()
    const handler = ({ type, body }: any) => {
      chan.emit(type, body)
    }

    this.ws.safetySend(
      JSON.stringify({
        type: "connect",
        body: { channel, id, params },
      }),
    )
    this.chanChan.on(id, handler)
    dbg(`[api::clients::channel] on: ${id}: ${channel.toString()}`)

    const off = () => {
      dbg(`[api::clients::channel] off: ${id}`)
      this.chanChan.off(id, handler)
      this.ws.safetySend(
        JSON.stringify({
          type: "disconnect",
          body: { id },
        }),
      )
    }

    const send = (type: string, body: Object) => {
      dbg(`[api::clients::channel] send: ${id}`)
      this.ws.safetySend(
        JSON.stringify({
          type: "channel",
          body: { id, type, body },
        }),
      )
    }

    return { id, chan, off, send }
  }

  // unsubNoteは別にいらんかな
  subNote(id: string) {
    this.ws.safetySend(
      JSON.stringify({
        type: "subNote",
        body: { id },
      }),
    )
  }
}
