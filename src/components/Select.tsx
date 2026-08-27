import { ComponentChildren } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"

export default function Select<T extends string>({
  value,
  onValueChange,
  items,
  renderValue,
  className,
}: {
  value: T
  onValueChange: (value: T) => void
  items: { value: T; label: ComponentChildren }[]
  renderValue?: (value: T) => ComponentChildren
  className?: string
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

  const current = items.find(item => item.value === value)

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        className={
          className ?? "flex h-full items-center gap-0.5 rounded-lg px-2 hover:bg-neutral-200"
        }
        onClick={() => setOpen(o => !o)}>
        {renderValue ? renderValue(value) : current?.label}
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-1 overflow-hidden rounded-lg border bg-white shadow-lg"
          onClick={() => setOpen(false)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") setOpen(false)
          }}>
          {items.map(item => (
            <button
              key={item.value}
              type="button"
              className="flex w-full select-none items-center gap-1 rounded-lg px-2 py-1.5 font-bold text-sm hover:bg-lime-200"
              onClick={() => onValueChange(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
