import { useScroll, useSize } from "ahooks"
import { useEffect, useState } from "react"

// utils

export function reltime(date: string) {
  // todo: relative
  return new Date(date).toISOString().slice(0, -1).split("T").join(" ")
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
