"use client"

import { useTLName } from "."

export default function TLSwitch() {
  const [tlName, setTlName] = useTLName()

  return (
    <>
      <div className="flex justify-between">
        <button
          className={"border-r py-2 grow text-center " + (tlName == "homeTimeline" ? "underline" : "")}
          onClick={() => {
            setTlName("homeTimeline")
          }}>
          HTL
        </button>

        <button
          className={"px-4 py-2 grow text-center " + (tlName == "globalTimeline" ? "underline" : "")}
          onClick={() => {
            setTlName("globalTimeline")
          }}>
          GTL
        </button>
      </div>
    </>
  )
}
