import { BarChartHorizontal, ChevronDown, EyeOff, Paperclip, User2, X } from 'lucide-preact'
import { useEffect, useRef } from 'preact/hooks'
import Dialog from '~/components/Dialog'
import Select from '~/components/Select'
import TextareaAutosize from '~/components/TextareaAutosize'
import { useAPI } from '~/features/api'
import { UseFormReturn, useForm, useKeysymWithOpts } from '~/hooks'
import { useComposeNoteDialog, useComposeNoteLastVisibility } from '..'
import VisibilityIcon, { Visibility } from './VisibilityIcon'

export type ComposeForm = {
  text: string
  visibility: Visibility
}

export default function NoteDialog() {
  const [open, setOpen] = useComposeNoteDialog()

  // NoteForm state
  const [visibility] = useComposeNoteLastVisibility()
  const form = useForm<ComposeForm>({
    values: { text: '', visibility },
  })

  // keysym: compose note
  useKeysymWithOpts(
    'n',
    {
      preventDefault: !open,
    },
    () => setOpen(true),
  )

  // おま○け
  const fst = useRef(true)
  useEffect(() => {
    if (open) history.pushState(null, '', '/compose/note')
    else if (!fst.current) history.back()
    fst.current = false
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen} overlayClassName="fixed inset-0 bg-black/50">
      <div className="fixed top-14 left-1/2 max-h-[85vh] w-lg translate-x-[-50%]">
        <NoteForm {...form} close={() => setOpen(false)} />
      </div>
    </Dialog>
  )
}

export function NoteForm({
  register,
  handleSubmit,
  getValues,
  setValue,
  close,
  minRows = 8,
  maxRows = 16,
}: UseFormReturn<ComposeForm> & { close: () => void; minRows?: number; maxRows?: number }) {
  const api = useAPI()
  const [, setVisibility] = useComposeNoteLastVisibility()

  const onSubmit = async (data: ComposeForm) => {
    if (!api) return
    setVisibility(data.visibility)
    await api.createNote(data)
    close()
    setValue('text', '')
  }

  // keysym: post note

  useKeysymWithOpts(
    'Enter',
    {
      mods: ['Control'],
    },
    handleSubmit(onSubmit),
  )

  const btn = 'rounded-lg hover:bg-neutral-200 p-2'
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-neutral-200 shadow-lg">
      <div className="flex justify-between p-2">
        <div className="flex">
          <User2 />
          <span>me</span>
        </div>
        <button type="button" onClick={close}>
          <X />
        </button>
      </div>
      <form className="flex flex-col gap-2 bg-white p-2" onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          className="w-full resize-none rounded-md border-2 border-neutral-300 p-1 focus:border-lime-500 focus:outline-none"
          maxRows={maxRows}
          minRows={minRows}
          placeholder="ここにテキストを入力"
          autoFocus
          {...register('text')}
        />
        <div className="flex justify-between px-1 text-neutral-700">
          <div className="flex items-center">
            <button className={btn} type="button">
              <Paperclip size={20} />
            </button>
            <button className={btn} type="button">
              <BarChartHorizontal size={20} />
            </button>
            <button className={btn} type="button">
              <EyeOff size={20} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <NFSelectVisibility
              value={(getValues('visibility') ?? 'public') as NonNullable<Visibility>}
              onValueChange={val => setValue('visibility', val)}
            />
            <button
              className="rounded-lg bg-misskey px-4 pt-2 pb-2.5 font-black text-lg text-white leading-none hover:brightness-95 active:brightness-90"
              type="submit">
              Note
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function NFSelectVisibility({
  value,
  onValueChange,
}: {
  value: NonNullable<Visibility>
  onValueChange: (val: NonNullable<Visibility>) => void
}) {
  const items = (
    [
      ['public', 'Public'],
      ['home', 'Home'],
      ['followers', 'Followers'],
      ['specified', 'Specified'],
    ] as const
  ).map(([name, label]) => ({
    value: name,
    label: (
      <span className="flex items-center gap-1 font-bold text-sm">
        <VisibilityIcon name={name} size={18} />
        <span className="-mt-0.5">{label}</span>
      </span>
    ),
  }))

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      items={items}
      renderValue={v => (
        <span className="flex items-center gap-0.5">
          <VisibilityIcon name={v} size={18} />
          <ChevronDown size={18} />
        </span>
      )}
    />
  )
}
