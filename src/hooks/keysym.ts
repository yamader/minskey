import { useEffect } from 'preact/hooks'

type Modkey = 'Shift' | 'Control' | 'Alt' | 'Meta'
type Keysym = string
type KeysymOptions = {
  preventDefault?: boolean
  mods?: Modkey[]
}

export function useKeysym(key: Keysym, mods: Modkey[], f: () => void) {
  useEffect(() => {
    const g = (e: KeyboardEvent) => {
      if (e.key === key && mods.every(m => e.getModifierState(m))) {
        e.preventDefault()
        f()
      }
    }
    window.addEventListener('keydown', g)
    return () => window.removeEventListener('keydown', g)
  }, [key, mods, f])
}

export function useKeysymWithOpts(key: Keysym, options: KeysymOptions, f: () => void) {
  useEffect(() => {
    const g = (e: KeyboardEvent) => {
      if (e.key === key && (options.mods ? options.mods.every(m => e.getModifierState(m)) : true)) {
        if (options.preventDefault) e.preventDefault()
        f()
      }
    }
    window.addEventListener('keydown', g)
    return () => window.removeEventListener('keydown', g)
  }, [key, options, f])
}
