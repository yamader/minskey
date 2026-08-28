export * from "./keysym"
export * from "./types"

import { createContext } from "preact"
import { useContext, useEffect, useState } from "preact/hooks"
import { usePathname, useSearchParams } from "~/router"

type DependencyList = ReadonlyArray<unknown>

// hooks

export function useClient() {
  const [x, setX] = useState(false)
  useEffect(() => setX(true), [])
  return x
}

// デッキのウィンドウなど、独自のスクロールコンテナの中でも動くようにする
// (グローバルではなくコンテキストで周囲にだけ効かせる。Windowごとに適用する)
const bottomRootContext = createContext<HTMLElement | null>(null)
export const BottomRootProvider = bottomRootContext.Provider

export function useBottom(f: () => void) {
  const el = useContext(bottomRootContext)

  useEffect(() => {
    if (el) {
      const check = () => {
        if (el.clientHeight + el.scrollTop >= el.scrollHeight - 1) f()
      }
      check()
      el.addEventListener("scroll", check, { passive: true })
      return () => el.removeEventListener("scroll", check)
    }
    const check = () => {
      const scroller = document.scrollingElement
      if (scroller && scroller.clientHeight + scroller.scrollTop >= scroller.scrollHeight - 1) f()
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [el, f])
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
