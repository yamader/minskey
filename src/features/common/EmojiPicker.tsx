import { lazy } from "react"

const Picker = lazy(() => import("emoji-picker-react"))

export function EmojiPicker({ onPicked }: { onPicked: (res: string | null) => void }) {
  return <Picker onEmojiClick={({ emoji }) => onPicked(emoji)} />
}
