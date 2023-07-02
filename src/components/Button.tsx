import { ReactNode } from "react"

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button className="rounded-lg bg-stone-700 px-4 py-1.5 font-bold text-white hover:bg-stone-600 active:bg-stone-500">
      {children}
    </button>
  )
}
