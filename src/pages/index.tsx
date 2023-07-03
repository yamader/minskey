import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect } from "react"

import CommonLayout from "~/components/CommonLayout"
import { accountAtom } from "~/libs/atoms"

export default function IndexPage() {
  const router = useRouter()
  const [account] = useAtom(accountAtom)

  useEffect(() => {
    if (!router.isReady) return
    if (account) router.replace("/home")
  }, [router, account])

  return (
    <CommonLayout>
      <div className="my-16 rounded-[2rem] border bg-lime-500 py-32 text-white">
        <h1 className="text-center font-inter text-8xl font-black">minskey</h1>
      </div>
    </CommonLayout>
  )
}
