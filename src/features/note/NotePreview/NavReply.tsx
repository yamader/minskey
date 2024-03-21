import { Reply } from "lucide-react"
import * as entities from "~/features/api/clients/entities"

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
