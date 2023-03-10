import * as Tooltip from "@radix-ui/react-tooltip"
import { entities } from "misskey-js"

import UserIcon from "~/components/UserIcon"
import { statusEmoji } from "~/libs/utils"

export default function UserProfile({ user }: { user?: entities.UserLite }) {
  const onlineStatus = user?.onlineStatus || "unknown"

  return (
    <>
      <div className="relative h-fit w-fit rounded-full border-4 bg-white p-2">
        <div className="h-36 w-36 rounded-full border-4">
          <UserIcon src={user?.avatarUrl} />
        </div>
        <div className="absolute bottom-1.5 right-1.5 flex h-11 w-11 rounded-full border-4 bg-white">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="m-auto cursor-default text-3xl leading-none">{statusEmoji(onlineStatus)}</span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="rounded-md border bg-white px-1 font-inter text-sm text-neutral-700 opacity-80 drop-shadow-sm">
                  {onlineStatus}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </>
  )
}
