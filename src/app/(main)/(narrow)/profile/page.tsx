"use client"

import { Tooltip } from "@radix-ui/themes"
import { useSearchParams } from "next/navigation"
import { Suspense, use, useMemo } from "react"
import { useAPI } from "~/features/api"
import { Note, User } from "~/features/api/clients/entities"
import { statusEmoji } from "~/features/profile"
import UserIcon from "~/features/profile/UserIcon"

// todo: cache
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileContent user={null} notes={[]} />}>
      <ProfileFetch />
    </Suspense>
  )
}

function ProfileFetch() {
  const api = useAPI()
  const searchParams = useSearchParams()
  const id = searchParams.get("user")

  const userFetch = useMemo(async () => {
    if (!api || !id) return null
    const [, username, host] = id.split("@")
    return api.showName(username, host)
  }, [api, id])
  const notesFetch = useMemo(async () => {
    const user = await userFetch
    if (!api || !user) return []
    return api.notes(user.id) ?? []
  }, [api, userFetch])

  const user = use(userFetch)
  const notes = use(notesFetch) ?? []
  if (user) user.onlineStatus ??= "unknown"

  return <ProfileContent user={user} notes={notes} />
}

function ProfileContent({ user, notes }: { user: User | null; notes: Note[] }) {
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
