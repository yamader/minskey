"use client"

import * as Collapsible from "@radix-ui/react-collapsible"
import { ChevronRight } from "lucide-react"

export function EmojiPicker({ onPicked }: { onPicked: (res: string | null) => void }) {
  return (
    <div>
      <CategoryName name="履歴" />
      <div>😀</div>
      <Collapsible.Root>
        <Collapsible.Trigger className="flex">
          <ChevronRight />
          others
        </Collapsible.Trigger>
        <Collapsible.Content>emojis</Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}

function CategoryName({ name }: { name: string }) {
  return <div>{name}</div>
}
