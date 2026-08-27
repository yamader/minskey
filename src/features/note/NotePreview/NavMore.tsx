import { MoreHorizontal } from "lucide-preact"
import { ComponentChildren } from "preact"
import Dropdown from "~/components/Dropdown"
import { useAccount } from "~/features/auth"
import { Note } from ".."

const menuItem =
  "focus:outline-none focus:bg-lime-200 mx-1 text-sm cursor-pointer px-2.5 py-1.5 font-bold rounded-md"

const Separator = () => <hr className="mx-1 h-px bg-neutral-200" />

function NavMoreRoot({ children }: { note: Note; children?: ComponentChildren }) {
  return (
    <Dropdown
      trigger={<MoreHorizontal size={20} />}
      menuClassName="flex flex-col gap-1 rounded-lg border bg-white py-1 shadow-md focus:outline-none">
      {children}
    </Dropdown>
  )
}

export default function NavMore({ note }: { note: Note }) {
  const account = useAccount()

  return (
    <NavMoreRoot note={note}>
      <button type="button" className={menuItem}>
        (空気)
      </button>
      <Separator />
      <button type="button" className={menuItem}>
        (空気2)
      </button>
      <Separator />
      <button
        type="button"
        className={menuItem}
        onClick={() => {
          if (!account) return
          window.open(`${account.host}/notes/${note.id}`, "_blank")
        }}>
        Misskeyで開く
      </button>
    </NavMoreRoot>
  )
}
