import { ComponentChildren } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"

export default function Dropdown({
  trigger,
  children,
  menuClassName,
  triggerClassName,
}: {
  trigger: ComponentChildren
  children: ComponentChildren
  menuClassName?: string
  triggerClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const mousedown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", mousedown)
    return () => document.removeEventListener("mousedown", mousedown)
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        className={`bg-transparent ${triggerClassName ?? ""}`}
        onClick={() => setOpen(o => !o)}>
        {trigger}
      </button>
      {open && (
        <div
          className={
            menuClassName ?? "absolute right-0 z-50 mt-1 rounded-lg border bg-white py-1 shadow-md"
          }
          onClick={() => setOpen(false)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") setOpen(false)
          }}>
          {children}
        </div>
      )}
    </div>
  )
}
