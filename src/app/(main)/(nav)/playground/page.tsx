"use client"

import { useRouter } from "next/navigation"
import { useAccounts, useAuth } from "~/features/auth"

export default function PlaygroundPage() {
  const { accounts } = useAccounts()
  const { setAuth } = useAuth()
  const router = useRouter()

  return (
    <>
      <h1 className="pb-8 pt-16 text-4xl font-black">Playground</h1>
      <p>
        <a href="/login/" className="underline ">
          アカウントを追加
        </a>
      </p>
      {accounts?.map((account, index) => (
        <div key={account.token}>
          <p
            onClick={() => {
              setAuth({ account: index })
              router.push("/home")
            }}>
            {account.user.name} (@{account.user.username}@{account.host})
          </p>
        </div>
      ))}
    </>
  )
}
