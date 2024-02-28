import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Item } from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { entities } from "misskey-js"
import { useAuth } from "~/features/auth"

const menuItem =
  "focus:outline-none focus:bg-lime-200 mx-1 text-sm cursor-pointer px-2.5 py-1.5 font-bold rounded-md"

const Separator = () => <DropdownMenu.Separator className="h-px bg-neutral-200" />

function NavMoreRoot({ children }: { note: entities.Note; children?: React.ReactNode }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MoreHorizontal size={20} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex flex-col gap-1 rounded-lg border bg-white py-1 shadow-md focus:outline-none"
          sideOffset={4}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default function NavMore({ note }: { note: entities.Note }) {
  const { account } = useAuth()

  return (
    <NavMoreRoot note={note}>
      <Item className={menuItem}>(空気)</Item>
      <Separator />
      <Item className={menuItem}>(空気2)</Item>
      <Separator />
      <Item
        className={menuItem}
        onClick={() => {
          if (!account) return
          window.open(`https://${account.host}/notes/${note.id}`, "_blank")
        }}>
        Misskeyで開く
      </Item>
    </NavMoreRoot>
  )
}
