import TopAppBar from "~/components/TopAppBar"
import SettingsSectionBar from "./SettingsSectionBar"

export default function SetingsPage({ children }: { children: React.ReactNode }) {
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
