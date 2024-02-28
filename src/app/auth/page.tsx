"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import NBSK from "~/components/NBSK"
import { useAccounts, useAuth } from "~/features/auth"
import { useClient } from "~/features/common"

export default function AuthPage() {
  return (
    <Suspense>
      <AuthSuspense />
    </Suspense>
  )
}

// todo: Suspenseでいい感じに書き直す
function AuthSuspense() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { session, setAuth } = useAuth()
  const { accounts, addAccount } = useAccounts()
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
        addAccount({ proto, host, token: res.token })
        setAuth({
          account: accounts?.length ?? 0,
          session: null,
          error: null,
        })
        router.replace(go)
      } catch (e) {
        const host = session?.host ? `${session?.proto}://${session?.host}` : null
        setAuth({ session: null, error: e + "" })
        router.replace(
          `/login?go=${encodeURIComponent(go)}` + (host ? `&host=${encodeURIComponent(host)}` : ""),
        )
      } finally {
        setDone(true)
      }
    })()
  }, [router, searchParams, session, setAuth, client, done, accounts, addAccount])

  return <NBSK />
}
