import { entities } from "misskey-js"
import { Suspense } from "react"

type Props = {
  user: entities.UserLite
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
