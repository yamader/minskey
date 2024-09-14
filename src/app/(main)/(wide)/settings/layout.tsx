import SettingsSectionBar from "~/components/SettingsSectionBar"
import TopAppBar from "~/components/TopAppBar"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-full">
        <div className="w-96 border-r">
          <TopAppBar content="設定" />
          <SettingsSectionBar tag="表示" href="/settings/ui/" />
          <SettingsSectionBar tag="アカウント" href="/settings/account/" />
          <SettingsSectionBar tag="その他" href="/settings/misc/" />
        </div>
        <div className="flex w-[36rem] flex-col">{children}</div>
      </div>
    </>
  )
}
