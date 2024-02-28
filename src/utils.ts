export function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export function promisify<T>(v: T) {
  return new Promise<T>(res => res(v))
}
