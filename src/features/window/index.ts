import { signal } from '@preact/signals'

// 開いているウィンドウ全体の重なり順を管理するサービス。
// 開く・クリック(フォーカス)のたびに単調増加する zIndex を割り当てる。
// カウンタはウィンドウを閉じても下がらないので、セッション中は "最後に触ったものが常に最前面" が保たれる。

export type WindowRecord = { id: number; z: number }

let nextId = 0
// デッキ内の z-50 ポップオーバーより上に置きたいので高い初期値から始める
const windowZCounter = signal(100)
const windowsSignal = signal<WindowRecord[]>([])

export function registerWindow(): number {
  const id = ++nextId
  windowsSignal.value = [...windowsSignal.value, { id, z: windowZCounter.value++ }]
  return id
}

export function unregisterWindow(id: number) {
  windowsSignal.value = windowsSignal.value.filter(w => w.id !== id)
}

export function raiseWindow(id: number) {
  const list = windowsSignal.value
  const w = list.find(x => x.id === id)
  if (!w || w.z >= Math.max(...list.map(x => x.z))) return
  windowsSignal.value = list.map(x => (x.id === id ? { ...x, z: windowZCounter.value++ } : x))
}

export function useWindowZ(id: number): number {
  return windowsSignal.value.find(w => w.id === id)?.z ?? 0
}
