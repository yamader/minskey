import { Suspense } from "react"
import { User } from "~/features/user"

type Props = {
  user: User
}

export default function ProfileCard(props: Props) {
  return (
    <Suspense>
      <ProfileCardSuspense {...props} />
    </Suspense>
  )
}

function ProfileCardSuspense({ user }: Props) {
  return null
}
