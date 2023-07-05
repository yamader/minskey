"use client"

import { useAtom } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import NBSK from "~/components/NBSK"
import { accountAtom, authErrorAtom, authSessionAtom } from "~/libs/atoms"

// todo: Suspenseでいい感じに書き直す
export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [, setAuthError] = useAtom(authErrorAtom)
  const [, setAccount] = useAtom(accountAtom)

  useEffect(() => {
    ;(async () => {
      try {
        const cid = searchParams?.get("session")
        if (!cid || !authSession) throw new Error("session not found")

        const { id, proto, host } = authSession
        if (cid !== id) throw new Error("invalid auth session")

        const url = `${proto}://${host}/api/miauth/${id}/check`
        const res = await fetch(url, { method: "POST" }).then(r => r.json())
        if (!res.ok) throw new Error("miauth failed")

        setAccount({ proto, host, token: res.token })
        setAuthSession(null)
        router.replace("/")
      } catch (e) {
        setAuthError(e + "")
        router.replace("/login")
      }
    })()
  }, [router, searchParams, authSession, setAuthSession, setAuthError, setAccount])

  return <NBSK />
}
