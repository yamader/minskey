"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import NBSK from "~/components/NBSK"
import { useAuth } from "~/features/auth/libs"

// todo: Suspenseでいい感じに書き直す
export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { session, setAuth } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const cid = searchParams?.get("session")
        if (!cid || !session) throw new Error("session not found")

        const { id, proto, host } = session
        if (cid !== id) throw new Error("invalid auth session")

        const url = `${proto}://${host}/api/miauth/${id}/check`
        const res = await fetch(url, { method: "POST" }).then(r => r.json())
        if (!res.ok) throw new Error("miauth failed")

        setAuth({
          account: { proto, host, token: res.token },
          session: null,
        })
        router.replace("/")
      } catch (e) {
        setAuth({ error: e + "" })
        router.replace("/login")
      }
    })()
  }, [router, searchParams, session, setAuth])

  return <NBSK />
}
