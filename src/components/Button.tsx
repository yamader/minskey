import { ComponentChildren } from "preact"

export default function Button({ children }: { children: ComponentChildren }) {
  return (
    <button
      type="button"
      className="rounded-lg bg-stone-700 px-4 py-1.5 font-bold text-white hover:bg-stone-600 active:bg-stone-500">
      {children}
    </button>
  )
}
