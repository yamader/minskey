"use client"

import { ReactNode } from "react"
import { useTLName } from "."
import { TLChanNames } from "../api"

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
