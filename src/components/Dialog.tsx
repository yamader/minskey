import { ComponentChildren } from 'preact'
import { useEffect } from 'preact/hooks'

export default function Dialog({
  open,
  onOpenChange,
  overlayClassName,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  overlayClassName?: string
  children: ComponentChildren
}) {
  useEffect(() => {
    if (!open) return
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        className={overlayClassName ?? 'fixed inset-0 bg-black/50'}
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  )
}
