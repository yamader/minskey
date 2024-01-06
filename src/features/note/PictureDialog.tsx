"use client"

import * as Dialog from "@radix-ui/react-dialog"

import { usePictureDialog } from "."

export default function PictureDialog() {
  const [picDialog, setPicDialog] = usePictureDialog()

  return (
    <Dialog.Root open={picDialog.open} onOpenChange={open => setPicDialog({ ...picDialog, open: open })}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        {/* 結構ごちゃっとしてるスタイリングなのでもうちょいわかりやすく書き直したほうがいいかもしれない */}
        {/* あまりに縦長の画像だと上下の一部がはみ出てしまうバグあり */}
        <Dialog.Content className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/2 ">
          <div className="w-fit max-w-full h-auto overflow-visible">
            <img src={picDialog.file} className="" alt="写真" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
