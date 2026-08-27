import { useState } from "preact/hooks"
import NBSK from "~/components/NBSK"
import { useAuth } from "~/features/auth"
import { useClient, useMutex } from "~/features/common"
import { useRouter, useSearchParams } from "~/router"
import { dbg } from "~/utils"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { session, addMultiAccount, setAuth } = useAuth()
  const client = useClient()
  const [once, setOnce] = useState(false) // 💩

  useMutex(async () => {
    if (!client || once) return
    const go = searchParams.get("go") || "/home"

    try {
      const cid = searchParams.get("session")
      if (!cid || !session) throw new Error("session not found")

      const { sid, host } = session
      if (cid !== sid) throw new Error("invalid auth session")

      const url = `${host}/api/miauth/${sid}/check`
      const res = await fetch(url, { method: "POST" }).then(r => r.json())
      if (!res.ok) throw new Error("miauth failed")
      if (!res.user.id) {
        // todo: re-fetch
      }
      dbg("auth success", res.user.id, res.token)

      const account = {
        host,
        uid: res.user.id,
        token: res.token,
      }
      setAuth({ account, session: null, error: null })
      addMultiAccount(account)

      router.replace(go)
    } catch (e) {
      const host = session?.host ?? null
      setAuth({ session: null, error: e + "" })
      router.replace(
        `/login?go=${encodeURIComponent(go)}` + (host ? `&host=${encodeURIComponent(host)}` : ""),
      )
    } finally {
      setOnce(true)
    }
  }, [router, searchParams, session, setAuth, addMultiAccount, client, once, setOnce])

  return <NBSK />
}
