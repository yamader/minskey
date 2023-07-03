"use client"

import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { accountAtom } from "~/libs/atoms"

export default function IndexPage() {
  const router = useRouter()
  const [account] = useAtom(accountAtom)

  useEffect(() => {
    if (account) router.replace("/home")
  }, [account, router])

  return (
    <>
      <div className="my-16 rounded-[2rem] border bg-lime-500 py-32 text-white">
        <h1 className="text-center font-inter text-8xl font-black">minskey</h1>
      </div>
    </>
  )
}
