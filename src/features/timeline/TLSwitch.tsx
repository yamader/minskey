import clsx, { ClassValue } from "clsx"
import { ReactNode } from "react"
import { TLNames, useTLName } from "."

const TLButton = ({ tl, children }: { tl: TLNames; children: ReactNode }) => {
  const [currentTl, setCurrentTl] = useTLName()
  return (
    <button
      type="button"
      className={"grow py-2 text-center " + (currentTl == tl ? "underline" : "")}
      onClick={() => setCurrentTl(tl)}>
      {children}
    </button>
  )
}

export const TLSwitch = ({ className }: { className?: ClassValue }) => (
  <div className={clsx("flex justify-between", className)}>
    <TLButton tl="homeTimeline">HTL</TLButton>
    <TLButton tl="localTimeline">LTL</TLButton>
    <TLButton tl="globalTimeline">GTL</TLButton>
  </div>
)
export default TLSwitch
