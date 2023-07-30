import { useEffect } from "react"

type Modkey = "Shift" | "Control" | "Alt" | "Meta"
type Keysym = string

export function useKeysym(key: Keysym, mods: Modkey[], f: () => void) {
  useEffect(() => {
    const g = (e: KeyboardEvent) => {
      if (e.key === key && mods.every(m => e.getModifierState(m))) {
        e.preventDefault()
        f()
      }
    }
    window.addEventListener("keydown", g)
    return () => window.removeEventListener("keydown", g)
  }, [key, mods, f])
}
