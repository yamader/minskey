import MisskeyLatestClient from "./misskey-latest"

export type APIClient = MisskeyLatestClient

export type MisskeyStream = {
  // type: body
  noteUpdated: Object
}

export type MisskeyChannels = {
  main: any
  homeTimeline: any
  localTimeline: any
  hybridTimeline: any
  globalTimeline: any
}
