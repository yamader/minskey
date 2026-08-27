import { ComponentChildren } from "preact"
import { useEffect, useRef } from "preact/hooks"

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
} & Omit<import("preact").JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onInput">) {
  const ref = useRef<HTMLTextAreaElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: 値が変わると再計測が必要
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "0px"
    const lineHeight = Number.parseInt(getComputedStyle(el).lineHeight) || 20
    let height = el.scrollHeight
    if (minRows) height = Math.max(height, minRows * lineHeight)
    if (maxRows) height = Math.min(height, maxRows * lineHeight)
    el.style.height = height + "px"
  }, [value, maxRows, minRows])

  return <textarea ref={ref} value={value} onInput={onInput} {...props} />
}
