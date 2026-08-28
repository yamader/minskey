import { createContext } from 'preact'
import { useContext, useEffect } from 'preact/hooks'

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
      el.addEventListener('scroll', check, { passive: true })
      return () => el.removeEventListener('scroll', check)
    }
    const check = () => {
      const scroller = document.scrollingElement
      if (scroller && scroller.clientHeight + scroller.scrollTop >= scroller.scrollHeight - 1) f()
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [el, f])
}
