"use client"

import { useAuth } from "~/features/auth/libs"
import { useSettings } from "~/features/settings/libs"

export default function SetingsPage() {
  const { account } = useAuth()
  const [settings] = useSettings()

  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <>
      <h1 className="pb-8 pt-16 text-4xl font-black">設定</h1>
      <p>ほげほげ</p>

      {account && (
        <section>
          <h2 className={h2class}>トークンの設定</h2>
        </section>
      )}

      <hr />

      <h2>生データ</h2>
      <pre>
        <code>{JSON.stringify(settings)}</code>
      </pre>
    </>
  )
}
