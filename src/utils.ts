// 標準ライブラリ的な

import { signal } from '@preact/signals'

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

export function dbg(...args: unknown[]) {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}

export function hostname(url: string) {
  //return URL.canParse(url) ? new URL(url).host : url
  return isValidURL(url) ? new URL(url).host : url
}

export function ensureproto(host: string) {
  return host.match(/^https?:\/\//) ? host : 'https://' + host
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

export function pick<T>(obj: T, ...keys: (keyof T)[]) {
  return Object.fromEntries(keys.map(key => [key, obj[key]]))
}

export function persistedSignal<T>(key: string, initial: T) {
  let value = initial
  try {
    const raw = localStorage.getItem(key)
    if (raw != null) value = JSON.parse(raw)
  } catch {
    // localStorage unavailable
  }
  const s = signal<T>(value)
  s.subscribe(value => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage unavailable
    }
  })
  return s
}
