"use client"

import { useTLName } from "."

export default function TLSwitch() {
  const [tlName, setTlName] = useTLName()

  return (
    <>
      <div className="flex justify-between">
        <button
          className={"grow border-r py-2 text-center " + (tlName == "homeTimeline" ? "underline" : "")}
          onClick={() => {
            setTlName("homeTimeline")
          }}>
          HTL
        </button>

        <button
          className={"grow px-4 py-2 text-center " + (tlName == "globalTimeline" ? "underline" : "")}
          onClick={() => {
            setTlName("globalTimeline")
          }}>
          GTL
        </button>
      </div>
    </>
  )
}
