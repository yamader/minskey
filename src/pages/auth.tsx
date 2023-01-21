import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

import { accountAtom, authSessionAtom } from "~/libs/atoms"

export default function AuthPage() {
  const router = useRouter()
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [, setAccount] = useAtom(accountAtom)

  const auth = useCallback(
    async (query: { session?: string }) => {
      const replace = "/login"

      if (!query.session || !authSession) {
        router.replace(replace)
        return
      }

      const { id, host } = authSession
      const url = `https://${host}/api/miauth/${id}/check`
      const res = await fetch(url, { method: "POST" }).then(r => r.json())
      if (!res.ok) {
        router.replace(replace)
        return
      }

      setAccount({ host, token: res.token })
      setAuthSession(null)
      router.replace("/") // todo: fix this
    },
    [router, authSession, setAuthSession, setAccount]
  )

  useEffect(() => {
    if (!router.isReady) return
    auth(router.query)
  }, [router, auth])

  return (
    <div className="flex h-full">
      <p className="m-auto flex text-xl">( ՞ةڼ◔)</p>
    </div>
  )
}
