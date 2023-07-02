import { useAtom } from "jotai"
import { useRouter } from "next/router"
//import { Suspense, useCallback, useEffect } from "react"
import { Suspense } from "react"

import CommonLayout from "~/components/CommonLayout"
import UserProfile from "~/components/UserProfile"
import { apiAtom } from "~/libs/atoms"

function Profile() {
  const router = useRouter()
  const [api] = useAtom(apiAtom)

  const { user } = router.query
  console.log(user)

  return <UserProfile />
}

export default function ProfilePage() {
  return (
    <CommonLayout>
      <Suspense fallback={<UserProfile />}>
        <Profile />
      </Suspense>
    </CommonLayout>
  )
}
