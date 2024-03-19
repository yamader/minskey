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
  //return URL.canParse(url) ? new URL(url).host : url
  return isValidURL(url) ? new URL(url).host : url
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

export function isValidURL(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function unique<T>(arr: T[]) {
  return Array.from(new Set(arr))
}
