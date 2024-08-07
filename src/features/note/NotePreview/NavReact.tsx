"use client"

import { Popover } from "@radix-ui/themes"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAPI } from "~/features/api"
import { useCurrentPath } from "~/features/common"
import { EmojiPicker } from "~/features/common/EmojiPicker"
import { Note } from ".."

export default function NavReact({ note }: { note: Note }) {
  const [open, setOpen] = useState(false)
  const api = useAPI()
  const router = useRouter()
  const currentPath = useCurrentPath()

  return (
    <Popover.Root
      open={open}
      onOpenChange={v => {
        setOpen(v && !!api)
        if (v && !api) router.push(`/login?go=${encodeURIComponent(currentPath)}`)
      }}>
      <Popover.Trigger>
        <Plus size={20} />
      </Popover.Trigger>
      <Popover.Content>
        <EmojiPicker
          onPicked={emoji => {
            if (!api || !emoji) return
            api.reactNote(note.id, emoji).catch(console.error)
          }}
        />
      </Popover.Content>
    </Popover.Root>
  )
}
