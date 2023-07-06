"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import UserProfile from "~/features/profile/UserProfile"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const id = searchParams?.get("user") || undefined

  return (
    <>
      <Suspense fallback={<UserProfile />}>
        <UserProfile id={id} />
      </Suspense>
    </>
  )
}
