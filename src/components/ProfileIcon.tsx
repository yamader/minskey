import { useAtom } from "jotai"
import useSWR from "swr"

import UserIcon from "~/components/UserIcon"
import { profileAtom } from "~/libs/atoms"
import { statusEmoji } from "~/libs/utils"

export default function ProfileIcon() {
  const [profile, setProfile] = useAtom(profileAtom)

  // todo: SWRでステータスの更新

  return (
    <div className="relative h-12 w-12">
      <UserIcon src={profile!.avatarUrl} />
      <span className="absolute bottom-0 right-0 rounded-full bg-white leading-none">
        {statusEmoji(profile!.onlineStatus)}
      </span>
    </div>
  )
}
