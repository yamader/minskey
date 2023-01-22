import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

import { accountAtom, authErrorAtom, authSessionAtom } from "~/libs/atoms"

// todo: Suspenseでいい感じに書き直す
export default function AuthPage() {
  const router = useRouter()
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [, setAuthError] = useAtom(authErrorAtom)
  const [, setAccount] = useAtom(accountAtom)

  const auth = useCallback(async () => {
    if (!router.isReady) return

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
    }
  }, [router, setAccount, authSession, setAuthSession, setAuthError])

  useEffect(() => {
    auth()
  }, [auth])

  return (
    <div className="flex h-full">
      <p className="m-auto flex text-xl">( ՞ةڼ◔)</p>
    </div>
  )
}
