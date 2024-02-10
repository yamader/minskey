"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import UserProfile from "~/features/profile/UserProfile"

export default function ProfilePage() {
  return (
    <Suspense fallback={<UserProfile />}>
      <ProfileSuspense />
    </Suspense>
  )
}

function ProfileSuspense() {
  const searchParams = useSearchParams()
  const id = searchParams.get("user")

  return <UserProfile id={id ?? undefined} />
}
