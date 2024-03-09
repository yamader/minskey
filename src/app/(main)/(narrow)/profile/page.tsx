"use client"

import { Tooltip } from "@radix-ui/themes"
import { useSearchParams } from "next/navigation"
import { Suspense, use, useMemo } from "react"
import { useAPI } from "~/features/api"
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
  const api = useAPI()
  const searchParams = useSearchParams()
  const id = searchParams.get("user")

  const userFetch = useMemo(async () => {
    if (!api || !id) return null
    const [, username, host] = id.split("@")
    return api.show(username, host)
  }, [api, id])
  const notesFetch = useMemo(async () => {
    const user = await userFetch
    if (!api || !user) return []
    return api.notes(user.id) ?? []
  }, [api, userFetch])

  const user = use(userFetch)
  const notes = use(notesFetch)
  const onlineStatus = user?.onlineStatus ?? "unknown"

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
          {JSON.stringify(notes)}
        </div>
      </div>
    </>
  )
}
