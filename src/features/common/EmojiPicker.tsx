import dynamic from "next/dynamic"

const Picker = dynamic(() => import("emoji-picker-react"))

export function EmojiPicker({ onPicked }: { onPicked: (res: string | null) => void }) {
  return <Picker onEmojiClick={({ emoji }) => onPicked(emoji)} />
}
