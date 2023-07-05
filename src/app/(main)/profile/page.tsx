"use client"

import { useAtom } from "jotai"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import UserProfile from "~/components/UserProfile"
import { apiAtom } from "~/libs/atoms"

function Profile() {
  // const router = useRouter()
  const searchParams = useSearchParams()
  const [api] = useAtom(apiAtom)

  const user = searchParams?.get("user")
  console.log(user)

  return <UserProfile />
}

export default function ProfilePage() {
  return (
    <>
      <Suspense fallback={<UserProfile />}>
        <Profile />
      </Suspense>
    </>
  )
}
