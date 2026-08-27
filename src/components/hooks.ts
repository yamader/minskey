import { useCallback, useEffect, useState } from "preact/hooks"

// 小さいフック置き場

function scrollPos(target: HTMLElement | Document) {
  if (target instanceof Document) {
    const el = target.scrollingElement
    return { top: el?.scrollTop ?? 0, left: el?.scrollLeft ?? 0 }
  }
  return { top: target.scrollTop, left: target.scrollLeft }
}

export function useSize(target: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (!target) return
    const measure = () => setSize({ width: target.clientWidth, height: target.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(target)
    return () => observer.disconnect()
  }, [target])
  return size
}

export function useScroll(target: HTMLElement | Document | null) {
  const [pos, setPos] = useState({ top: 0, left: 0 })
  useEffect(() => {
    if (!target) return
    const update = () => setPos(scrollPos(target))
    update()
    target.addEventListener("scroll", update)
    return () => target.removeEventListener("scroll", update)
  }, [target])
  return pos
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
