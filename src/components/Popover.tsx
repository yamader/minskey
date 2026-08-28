import { ComponentChildren } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

export default function Popover({
  open,
  onOpenChange,
  trigger,
  contentClassName,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: ComponentChildren
  contentClassName?: string
  children: ComponentChildren
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === 'Escape') onOpenChange(false)
        return
      }
      if (!ref.current?.contains(e.target as Node)) onOpenChange(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open, onOpenChange])

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" className="bg-transparent" onClick={() => onOpenChange(!open)}>
        {trigger}
      </button>
      {open && <div className={contentClassName ?? 'absolute z-50 mt-1'}>{children}</div>}
    </div>
  )
}
