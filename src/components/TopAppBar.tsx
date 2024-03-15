"use client"

import { Tooltip } from "@radix-ui/themes"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TopAppBar({ content, back }: { content: React.ReactNode; back?: boolean }) {
  const router = useRouter()

  return (
    <div className="flex min-h-12 items-center border-b px-2">
      {back && (
        <Tooltip content="戻る">
          <Link
            className="mr-5 rounded-full p-2 hover:bg-neutral-100"
            href="/home/"
            onClick={router.back}>
            <ArrowLeft className="text-neutral-600" size={18} />
          </Link>
        </Tooltip>
      )}
      {content}
    </div>
  )
}
