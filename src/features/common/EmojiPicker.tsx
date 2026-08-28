import { useEffect, useRef } from 'preact/hooks'
import 'emoji-picker-element'
import { EmojiClickEvent } from 'emoji-picker-element/shared'

export function EmojiPicker({ onPicked }: { onPicked: (res: string | null) => void }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: EmojiClickEvent) => {
      const emoji = e.detail.emoji
      onPicked('unicode' in emoji ? emoji.unicode : null)
    }
    el.addEventListener('emoji-click', handler as EventListener)
    return () => el.removeEventListener('emoji-click', handler as EventListener)
  }, [onPicked])

  return <emoji-picker ref={ref} />
}
