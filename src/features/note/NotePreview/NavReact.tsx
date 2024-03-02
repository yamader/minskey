"use client"

import { Popover } from "@radix-ui/themes"
import { Plus } from "lucide-react"
import { entities } from "misskey-js"
import { useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import { useAPI } from "~/features/api"
import { useCurrentPath } from "~/features/common"
import { EmojiPicker } from "~/features/common/EmojiPicker"

export default function NavReact(props: { note: entities.Note }) {
  return (
    <Suspense>
      <NavReactSuspense {...props} />
    </Suspense>
  )
}

function NavReactSuspense({ note }: { note: entities.Note }) {
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
            alert(`react: ${emoji}`)
            setOpen(false)
          }}
        />
      </Popover.Content>
    </Popover.Root>
  )
}
