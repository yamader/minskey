"use client"

import { Tooltip } from "@radix-ui/themes"
import { useSearchParams } from "next/navigation"
import { Suspense, use } from "react"
import { useAPI } from "~/features/api"
import { Note, User } from "~/features/api/clients/entities"
import { useAccount } from "~/features/auth"
import { statusEmoji } from "~/features/profile"
import UserIcon from "~/features/profile/UserIcon"

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileContent />}>
      <ProfileFetch />
    </Suspense>
  )
}

function ProfileFetch() {
  const api = useAPI()
  const searchParams = useSearchParams()
  const account = useAccount()

  if (!api) return <ProfileContent />

  const id = searchParams.get("user")

  let userFetch: ReturnType<typeof api.showName>
  if (id) {
    const [, username, host] = id.split("@")
    userFetch = api.showName(username, host)
  } else {
    userFetch = api.me()
  }
  const user = use(userFetch)

  const notesFetch = user && api.notes(user.id)
  const notes = (notesFetch && use(notesFetch)) ?? []

  return <ProfileContent user={user} notes={notes} />
}

function ProfileContent({ user = null, notes = [] }: { user?: User | null; notes?: Note[] }) {
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
