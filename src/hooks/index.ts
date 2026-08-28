export * from './bottom'
export * from './form'
export * from './keysym'

import { useCallback, useEffect, useState } from 'preact/hooks'
import { usePathname, useSearchParams } from '~/router'

export function useClient() {
  const [x, setX] = useState(false)
  useEffect(() => setX(true), [])
  return x
}

export function useCurrentPath() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return `${pathname}?${searchParams.toString()}`
}

// asyncなAPIとかで使うかも
type DependencyList = ReadonlyArray<unknown>
export function useMutex(f: (done: () => void) => unknown, deps?: DependencyList) {
  const [mutex, setMutex] = useState(false)
  useEffect(() => {
    if (mutex) return
    setMutex(true)
    const res = f(() => setMutex(false))
    if (res instanceof Promise) res.then(() => setMutex(false))
  }, [f, mutex, ...(deps ?? [])])
}

export function useImmer<S>(initial: S) {
  const [state, setState] = useState(initial)
  const update = useCallback((producer: (draft: S) => void) => {
    setState(prev => {
      const draft = structuredClone(prev)
      producer(draft)
      return draft
    })
  }, [])
  return [state, update] as const
}
