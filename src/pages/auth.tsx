import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { accountAtom, authErrorAtom, authSessionAtom } from "~/libs/atoms"

// todo: Suspenseでいい感じに書き直す
export default function AuthPage() {
  const router = useRouter()
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [, setAuthError] = useAtom(authErrorAtom)
  const [, setAccount] = useAtom(accountAtom)
  const [done, setDone] = useState(false) // 💩 こうしないとなんか怒られる

  useEffect(() => {
    if (!router.isReady || done) return
    ;(async () => {
      try {
        if (!router.query.session || !authSession) throw new Error("session not found")

        const { id, host } = authSession
        const url = `https://${host}/api/miauth/${id}/check`
        const res = await fetch(url, { method: "POST" }).then(r => r.json())
        if (!res.ok) throw new Error("miauth failed")

        setAccount({ host, token: res.token })
        setAuthSession(null)
        router.replace("/")
      } catch (e) {
        setAuthError(e + "")
        router.replace("/login")
      } finally {
        setDone(true)
      }
    })()
  }, [router, setAccount, authSession, setAuthSession, setAuthError, done, setDone])

  return (
    <div className="flex h-full">
      <p className="m-auto flex text-xl">( ՞ةڼ◔)</p>
    </div>
  )
}
