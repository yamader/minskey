// 標準ライブラリ的な

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never

export function dbg(...args: unknown[]) {
  if (process.env.NODE_ENV != "production") {
    console.log(...args)
  }
}

export function hostname(url: string) {
  return new URL(url).host
}

export function ensureproto(host: string) {
  return host.match(/^https?:\/\//) ? host : "https://" + host
}

export function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export function promisify<T>(v: T) {
  return new Promise<T>(res => res(v))
}
