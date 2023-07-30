import { useScroll, useSize } from "ahooks"
import { useEffect, useState } from "react"
export * from "./keysym"

// utils

export function reltime(rawdate: string): string {
  const diffsec = Math.round((Date.now() - new Date(rawdate).valueOf()) / 1000) //秒
  const diffmin = Math.round(diffsec / 60) //分
  const diffhour = Math.round(diffmin / 60) //時間
  const diffday = Math.round(diffhour / 24)
  if (diffsec < 20) {
    return `今`
  }
  if (diffmin < 1) {
    return `${diffsec}秒前`
  } else if (diffhour < 1) {
    return `${diffmin}分前`
  } else if (diffday < 1) {
    return `${diffhour}時間前`
  } else {
    return `${diffday}日前`
  }
}

export function abstime(rawdate: string): string {
  return new Date(rawdate).toISOString().slice(0, -1).split("T").join(" ")
}

// hooks

export function useClient() {
  const [x, setX] = useState(false)
  useEffect(() => setX(true), [])
  return x
}

export function useBottom(f: () => void) {
  // SSR
  globalThis.document ??= { body: { scrollHeight: -1 } } as Document

  const size = useSize(document.body)
  const pos = useScroll(document)

  useEffect(() => {
    if ((size?.height ?? 0) + (pos?.top ?? 0) >= document.body.scrollHeight) f()
  }, [size?.height, pos?.top, f])
}
