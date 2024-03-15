"use client"

import { ReactNode } from "react"
import { TLChanNames } from "~/features/api/types"
import { useTLName } from "."

const TLButton = ({ tl, children }: { tl: TLChanNames; children: ReactNode }) => {
  const [currentTl, setCurrentTl] = useTLName()
  return (
    <button
      className={"grow py-2 text-center " + (currentTl == tl ? "underline" : "")}
      onClick={() => setCurrentTl(tl)}>
      {children}
    </button>
  )
}

export const TLSwitch = () => (
  <div className="flex justify-between">
    <TLButton tl="homeTimeline">HTL</TLButton>
    <TLButton tl="localTimeline">LTL</TLButton>
    <TLButton tl="globalTimeline">GTL</TLButton>
  </div>
)
export default TLSwitch
