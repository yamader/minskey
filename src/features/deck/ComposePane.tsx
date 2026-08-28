import { X } from "lucide-preact"
import { useForm } from "~/components/useForm"
import { useComposeNoteLastVisibility } from "~/features/compose"
import { ComposeForm, NoteForm } from "~/features/compose/NoteDialog"
import { useDeckComposeOpen } from "."

export default function ComposePane() {
  const [open, setOpen] = useDeckComposeOpen()
  const [visibility] = useComposeNoteLastVisibility()
  const form = useForm<ComposeForm>({ values: { text: "", visibility } })

  return (
    <div
      className={
        "flex shrink-0 overflow-hidden border-r bg-white transition-all " +
        (open ? "w-[22rem]" : "w-0")
      }>
      {open && (
        <div className="w-[22rem] shrink-0 p-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="font-bold text-sm">新しい投稿</span>
            <button
              type="button"
              className="rounded p-1 hover:bg-neutral-100"
              title="閉じる"
              onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <NoteForm {...form} close={() => setOpen(false)} minRows={2} maxRows={10} />
        </div>
      )}
    </div>
  )
}
