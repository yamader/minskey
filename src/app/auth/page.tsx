"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import NBSK from "~/components/NBSK"
import { useAuth } from "~/features/auth/libs"
import { useClient } from "~/libs/utils"

// todo: Suspenseでいい感じに書き直す
export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { session, setAuth } = useAuth()
  const client = useClient()
  const [done, setDone] = useState(false) // 💩

  useEffect(() => {
    if (!client || done) return
    const go = searchParams.get("go") || "/home"
    ;(async () => {
      try {
        const cid = searchParams.get("session")
        if (!cid || !session) throw new Error("session not found")

        const { id, proto, host } = session
        if (cid !== id) throw new Error("invalid auth session")

        const url = `${proto}://${host}/api/miauth/${id}/check`
        const res = await fetch(url, { method: "POST" }).then(r => r.json())
        if (!res.ok) throw new Error("miauth failed")

        setAuth({
          account: { proto, host, token: res.token },
          session: null,
          error: null,
        })
        router.replace(go)
      } catch (e) {
        const host = session?.host ? `${session?.proto}://${session?.host}` : null
        setAuth({ session: null, error: e + "" })
        router.replace(`/login?go=${encodeURIComponent(go)}` + (host ? `&host=${encodeURIComponent(host)}` : ""))
      } finally {
        setDone(true)
      }
    })()
  }, [router, searchParams, session, setAuth, client, done])

  return <NBSK />
}