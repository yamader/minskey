import { useRouter } from "next/router"

import CommonLayout from "~/components/CommonLayout"
// import UserProfile from "~/components/UserProfile"

export default function ProfilePage() {
  const router = useRouter()

  const { user } = router.query
  console.log(user)

  return (
    <CommonLayout>
      {/*<UserProfile user={} />*/}
    </CommonLayout>
  )
}
