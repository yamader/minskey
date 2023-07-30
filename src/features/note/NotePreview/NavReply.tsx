import { Reply } from "lucide-react"
import { entities } from "misskey-js"

export default function NavReply({ note }: { note: entities.Note }) {
  return (
    <button
      onClick={() => {
        alert("Reply!")
      }}>
      <Reply size={20} />
    </button>
  )
}
