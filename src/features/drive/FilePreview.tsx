"use client"

import { entities } from "misskey-js"
import Image from "next/image"
import { usePictureDialog } from "../note"

export default function FilePreview({ file }: { file: entities.DriveFile }) {
  const [picDialog, setPicDialog] = usePictureDialog()

  if (file.type.startsWith("image/")) {
    return (
      <Image
        className="w-fit"
        src={file.url}
        width={125}
        height={125}
        alt="File"
        onClick={() => {
          console.log("click")
          setPicDialog({ open: true, file: file.url })
        }}
      />
    )
  } else {
    return (
      <>
        {file.url}({file.type})
      </>
    )
  }
}
