import { entities } from "misskey-js"
import Image from "next/image"

export default function FilePreview({ file }: { file: entities.DriveFile }) {
  if (file.type.startsWith("image/")) {
    return <Image className="w-fit" src={file.url} width={125} height={125} alt="File" />
  } else {
    return (
      <>
        {file.url}({file.type})
      </>
    )
  }
}
