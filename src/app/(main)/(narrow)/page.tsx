"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useLogin } from "~/features/auth"

export default function IndexPage() {
  const router = useRouter()
  const login = useLogin()

  useEffect(() => {
    if (login) router.replace("/home")
  }, [router, login])

  return (
    <>
      <div className="my-16 rounded-[2rem] border bg-lime-500 py-32 text-white">
        <h1 className="text-center font-black font-inter text-8xl">minskey</h1>
      </div>
    </>
  )
}
