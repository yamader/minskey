"use client"

import { useMfmProvider } from "~/features/common/mfm"
import { useNotificationsStream } from "~/features/notifications"
import { useTLStream } from "~/features/timeline"
import RightNav from "./RightNav"

export default function MainNarrowLayout({ children }: { children: React.ReactNode }) {
  useMfmProvider()
  useTLStream()
  useNotificationsStream()

  return (
    <>
      <div className="flex w-[36rem] flex-col">{children}</div>
      <RightNav />
    </>
  )
}
