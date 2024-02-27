import * as Popover from "@radix-ui/react-popover"
import { Plus } from "lucide-react"
import { entities } from "misskey-js"

export default function NavReact({ note }: { note: entities.Note }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Plus size={20} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-lg border bg-white p-4 shadow-md focus:outline-none"
          sideOffset={4}>
          (空気)
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
