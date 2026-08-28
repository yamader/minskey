import { useEffect, useRef } from 'preact/hooks'

export default function TextareaAutosize({
  value,
  onInput,
  maxRows,
  minRows,
  ...props
}: {
  value: string
  onInput: (e: { currentTarget: HTMLTextAreaElement }) => void
  maxRows?: number
  minRows?: number
} & Omit<import('preact').JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onInput'>) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '0px'
    const lineHeight = Number.parseInt(getComputedStyle(el).lineHeight, 10) || 20
    let height = el.scrollHeight
    if (minRows) height = Math.max(height, minRows * lineHeight)
    if (maxRows) height = Math.min(height, maxRows * lineHeight)
    el.style.height = height + 'px'
  }, [value, maxRows, minRows])

  return <textarea ref={ref} value={value} onInput={onInput} {...props} />
}
