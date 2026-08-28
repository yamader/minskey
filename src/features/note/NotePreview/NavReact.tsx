import { Plus } from 'lucide-preact'
import { useState } from 'preact/hooks'
import Popover from '~/components/Popover'
import { useAPI } from '~/features/api'
import { EmojiPicker } from '~/features/emoji/EmojiPicker'
import { useCurrentPath } from '~/hooks'
import { useRouter } from '~/router'
import { Note } from '..'

export default function NavReact({ note }: { note: Note }) {
  const [open, setOpen] = useState(false)
  const api = useAPI()
  const router = useRouter()
  const currentPath = useCurrentPath()

  return (
    <Popover
      open={open}
      onOpenChange={v => {
        setOpen(v && !!api)
        if (v && !api) router.push(`/login?go=${encodeURIComponent(currentPath)}`)
      }}
      trigger={<Plus size={20} />}>
      <EmojiPicker
        onPicked={emoji => {
          if (!api || !emoji) return
          api.reactNote(note.id, emoji).catch(console.error)
        }}
      />
    </Popover>
  )
}
