"use client"

import { useId } from "react"
import { useAuth } from "~/features/auth"
import { useSettings } from "~/features/settings"

export default function SetingsPage() {
  const { account } = useAuth()
  const [settings, setSettings] = useSettings()

  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  const darkId = useId()
  const absDateId = useId()

  return (
    <>
      <h1 className="pb-8 pt-16 text-4xl font-black">設定</h1>

      <section>
        <h2 className={h2class}>アプリ設定</h2>
        <div className="flex gap-5">
          <div>
            <input
              type="checkbox"
              id={darkId}
              checked={settings.dark}
              onChange={e => setSettings({ ...settings, dark: e.target.checked })}
            />
            <label htmlFor={darkId} className="ml-2 select-none">
              ダークモード
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id={absDateId}
              checked={settings.absDate}
              onChange={e => setSettings({ ...settings, absDate: e.target.checked })}
            />
            <label htmlFor={absDateId} className="ml-2 select-none">
              日付絶対表示
            </label>
          </div>
        </div>
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
