"use client"

import * as Dialog from "@radix-ui/react-dialog"
import * as Select from "@radix-ui/react-select"
import { BarChartHorizontal, ChevronDown, EyeOff, Paperclip, User2, X } from "lucide-react"
import { ComponentProps, forwardRef, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { useAPI } from "~/features/api"

import { useNoteDialog, useNoteVisibility } from "."
import VisibilityIcon, { Visibility } from "./VisibilityIcon"

export default function NoteDialog() {
  const [open, setOpen] = useNoteDialog()

  // おま○け
  const fst = useRef(false)
  useEffect(() => {
    if (open) history.pushState(null, "", "/compose/note")
    else if (fst.current) history.back()
    fst.current = true
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={open => setOpen(open)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-14 max-h-[85vh] w-[32rem] translate-x-[-50%]">
          <NoteForm close={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function NoteForm({ close }: { close: () => void }) {
  const api = useAPI()
  const [visibility, setVisibility] = useNoteVisibility()

  type FormData = {
    text: string
    visibility: Visibility
  }
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { visibility },
  })
  const onSubmit = async (data: FormData) => {
    if (!api) return
    setVisibility(data.visibility)
    await api.request("notes/create", data)
    close()
  }

  const btn = "rounded-lg hover:bg-neutral-200 p-2"
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-neutral-200 shadow-lg">
      <div className="flex justify-between p-1">
        <div className="flex">
          <User2 />
          <span>me</span>
        </div>
        <button onClick={close}>
          <X />
        </button>
      </div>
      <form className="flex flex-col gap-2 bg-white p-2" onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          className="w-full resize-none rounded-md border-2 border-neutral-300 p-1 focus:border-lime-500 focus:outline-none"
          maxRows={16}
          minRows={8}
          placeholder="ここにテキストを入力"
          autoFocus
          {...register("text")}
        />
        <div className="flex justify-between px-1 text-neutral-700">
          <div className="flex items-center">
            <button className={btn}>
              <Paperclip size={20} />
            </button>
            <button className={btn}>
              <BarChartHorizontal size={20} />
            </button>
            <button className={btn}>
              <EyeOff size={20} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <NFSelectVisibility
              defaultValue={visibility}
              onValueChange={val => setValue("visibility", val as Visibility)}
            />
            <button
              className="rounded-lg bg-misskey px-4 pb-2.5 pt-2 text-lg font-black leading-none text-white hover:brightness-95 active:brightness-90"
              type="submit">
              Note
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function NFSelectVisibility(props: ComponentProps<typeof Select.Root>) {
  const SelectVisibility = forwardRef<HTMLDivElement, ComponentProps<typeof Select.Item> & { value: Visibility }>(
    ({ children, value, ...props }, ref) => (
      <Select.Item
        className="select-none rounded-lg px-2 py-1.5 data-[highlighted]:bg-lime-200 data-[state=checked]:text-lime-700"
        value={value}
        {...props}
        ref={ref}>
        <Select.ItemText>
          <div className="flex items-center gap-1 text-sm font-bold">
            <VisibilityIcon name={value} size={18} />
            <p className="-mt-0.5">{children}</p>
          </div>
        </Select.ItemText>
      </Select.Item>
    )
  )

  return (
    <Select.Root {...props}>
      <Select.Trigger className="flex h-full items-center gap-0.5 rounded-lg px-2 hover:bg-neutral-200">
        <Select.Value />
        <Select.Icon>
          <ChevronDown size={18} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-lg border bg-white shadow-lg">
          <Select.Viewport className="p-1">
            <Select.Group>
              <SelectVisibility value="public">Public</SelectVisibility>
              <SelectVisibility value="home">Home</SelectVisibility>
              <SelectVisibility value="followers">Followers</SelectVisibility>
              <SelectVisibility value="specified">Specified</SelectVisibility>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
