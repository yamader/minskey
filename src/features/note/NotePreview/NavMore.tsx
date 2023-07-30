import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { entities } from "misskey-js"

export default function NavMore({ note }: { note: entities.Note }) {
  const menuItem = "focus:outline-none focus:bg-lime-200 mx-1 text-sm cursor-pointer px-2.5 py-1.5 font-bold rounded-md"
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MoreHorizontal size={20} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex flex-col gap-1 rounded-lg border bg-white py-1 shadow-md focus:outline-none"
          sideOffset={4}>
          <DropdownMenu.Item className={menuItem}>(空気)</DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-neutral-200" />
          <DropdownMenu.Item className={menuItem}>(空気2)</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
