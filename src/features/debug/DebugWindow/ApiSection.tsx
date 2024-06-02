import { useState } from "react"
import H2 from "~/components/html/H2"
import { useAPI } from "~/features/api"
import { pick } from "~/utils"

export default function ApiSection() {
  const [, refresh] = useState({})
  const api = useAPI()

  const ckeys = Object.keys(_minsk_api_cache)

  return (
    <section>
      <H2>API</H2>
      <button className="rounded-lg border-4 border-red-500 px-1" onClick={refresh}>
        Refresh
      </button>
      <div className="flex flex-col gap-2.5 break-all p-2 font-mono">
        <div>api: {JSON.stringify(api && pick(api, "id", "host", "token", "_cachePrefix"))}</div>
        <div>
          _minsk_api_cache[{ckeys.length}]: [
          {ckeys.map(key => (
            <>
              <span className="rounded bg-neutral-300 px-1">{key}</span>,
            </>
          ))}
          ]
        </div>
      </div>
    </section>
  )
}
