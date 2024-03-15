import { Link } from "lucide-react"
import { entities } from "misskey-js"
import Image from "next/image"

export default function FilePreview({ file }: { file: entities.DriveFile }) {
  if (file.type.startsWith("image/")) {
    return <Image className="w-fit" src={file.url} width={125} height={125} alt="File" />
  } else if (file.type.startsWith("video/")) {
    return <video className="w-full" src={file.url} controls />
  } else {
    return (
      <>
        <Link href={file.url}>{file.name}</Link> ({file.type})
      </>
    )
  }
}
