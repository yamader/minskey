import { signal } from '@preact/signals'

const debugWindowSignal = signal(import.meta.env.DEV)

export function useDebugWindow() {
  const setDebugWindow = (v: boolean) => {
    debugWindowSignal.value = v
  }
  return [debugWindowSignal.value, setDebugWindow] as const
}
