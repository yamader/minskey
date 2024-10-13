import { Reply } from "lucide-react"
import { Note } from ".."

export default function NavReply({ note }: { note: Note }) {
  return (
    <button
      type="button"
      onClick={() => {
        alert("Reply!")
      }}>
      <Reply size={20} />
    </button>
  )
}
