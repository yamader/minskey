import { atom, useAtom } from "jotai"

const debugWindowAtom = atom(process.env.NODE_ENV === "development")

export function useDebugWindow() {
  return useAtom(debugWindowAtom)
}
