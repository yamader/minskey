"use client"

import { Tooltip } from "@radix-ui/themes"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { statusEmoji } from "~/features/profile"
import UserIcon from "~/features/profile/UserIcon"

export default function ProfilePage() {
  return (
    <Suspense fallback={null /* todo */}>
      <ProfileSuspense />
    </Suspense>
  )
}

function ProfileSuspense() {
  const searchParams = useSearchParams()
  const id = searchParams.get("user")

  const user = null
  const onlineStatus = "unknown"

  return (
    <>
      <div className="relative h-fit w-fit rounded-full border-4 bg-white p-2">
        <div className="h-36 w-36 rounded-full border-4">
          <UserIcon user={user} />
        </div>
        <div className="absolute bottom-1.5 right-1.5 flex h-11 w-11 rounded-full border-4 bg-white">
          <Tooltip content={onlineStatus}>
            <span className="m-auto cursor-default text-3xl leading-none">
              {statusEmoji(onlineStatus)}
            </span>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
