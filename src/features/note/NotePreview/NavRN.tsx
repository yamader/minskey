import { Quote, Repeat2 } from "lucide-preact"
import Dropdown from "~/components/Dropdown"
import { useAPI } from "~/features/api"
import { Note } from ".."

export default function NavRN({ note }: { note: Note }) {
  const api = useAPI()

  const menuItem =
    "focus:outline-none focus:bg-lime-200 flex mx-1 gap-1.5 text-sm cursor-pointer items-center pl-2.5 pr-3.5 py-1.5 font-bold rounded-md"
  return (
    <Dropdown
      trigger={note.isHidden ? <Repeat2 size={20} /> : <Repeat2 size={20} />}
      menuClassName="flex flex-col gap-1 rounded-lg border bg-white py-1 shadow-md focus:outline-none">
      <button
        type="button"
        className={menuItem}
        onClick={async () => {
          if (!api) return
          await api.createNote({ renoteId: note.id })
        }}>
        <Repeat2 size={16} />
        RN
      </button>
      <hr className="mx-1 h-px bg-neutral-200" />
      <button
        type="button"
        className={menuItem}
        onClick={() => {
          alert("Quote!")
        }}>
        <Quote size={16} />
        Quote
      </button>
    </Dropdown>
  )
}
