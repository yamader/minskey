"use client"

import { useAuth } from "~/features/auth"
import Switch from "~/features/common/Switch"
import { useSettings } from "~/features/settings"

export default function SetingsPage() {
  const { account } = useAuth()
  const [settings, setSetings] = useSettings()

  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <>
      <h1 className="pb-8 pt-16 text-4xl font-black">設定</h1>

      <section>
        <h2 className={h2class}>アプリ設定</h2>
        <Switch
          init={settings.dark}
          onChange={d => {
            // なぜか設定が書き込まれない
            setSetings({ ...settings, dark: d })
          }}>
          DarkMode
        </Switch>
      </section>

      {account && (
        <section>
          <h2 className={h2class}>トークンの設定</h2>
          <p>現在準備中</p>
        </section>
      )}

      <hr />

      <section>
        <h2>生データ</h2>
        <pre>
          <code>{JSON.stringify(settings)}</code>
        </pre>
      </section>
    </>
  )
}
