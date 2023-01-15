import { entities } from "misskey-js"

export default function UserProfile({ user }: { user: entities.UserLite }) {
  return (
    <div>
      <div>{user.name}</div>
    </div>
  )
}
