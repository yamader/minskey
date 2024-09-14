import { Link } from "lucide-react"
import Image from "next/image"
import { DriveFile } from "~/features/drive"

export default function FilePreview({ file }: { file: DriveFile }) {
  if (file.type.startsWith("image/")) {
    return <Image className="w-fit" src={file.url} width={125} height={125} alt="File" />
  }
  if (file.type.startsWith("video/")) {
    return <video className="w-full" src={file.url} controls />
  }
  return (
    <>
      <Link href={file.url}>{file.name}</Link> ({file.type})
    </>
  )
}
