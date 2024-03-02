import { useScroll, useSize } from "ahooks"
import { usePathname, useSearchParams } from "next/navigation"
import { DependencyList, useEffect, useState } from "react"
export * from "./keysym"

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

export function useCurrentPath() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return `${pathname}?${searchParams.toString()}`
}

// asyncなAPIとかで使うかも
export function useMutex(f: (done: () => void) => unknown, deps?: DependencyList) {
  const [mutex, setMutex] = useState(false)
  useEffect(() => {
    if (mutex) return
    setMutex(true)
    const res = f(() => setMutex(false))
    if (res instanceof Promise) res.then(() => setMutex(false))
  }, [f, mutex, ...(deps ?? [])])
}
