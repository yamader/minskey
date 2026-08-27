export * from "./keysym"
export * from "./types"

import { useEffect, useState } from "preact/hooks"
import { useScroll, useSize } from "~/components/hooks"
import { usePathname, useSearchParams } from "~/router"

type DependencyList = ReadonlyArray<unknown>

// hooks

export function useClient() {
  const [x, setX] = useState(false)
  useEffect(() => setX(true), [])
  return x
}

export function useBottom(f: () => void) {
  const size = useSize(document.documentElement)
  const pos = useScroll(document)

  useEffect(() => {
    const el = document.scrollingElement
    if (el && size.height + pos.top >= el.scrollHeight) f()
  }, [size.height, pos.top, f])
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
