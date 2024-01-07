import { Notification } from "misskey-js/built/entities"

export default function Notice({ notice }: { notice: Notification }) {
  return <div>{notice.id}</div>
}
