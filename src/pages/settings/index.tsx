import { Route, Router } from "preact-router"
import { useEffect } from "preact/hooks"
import SettingsSectionBar from "~/components/SettingsSectionBar"
import TopAppBar from "~/components/TopAppBar"
import { useRouter } from "~/router"
import AccountSettingsPage from "./account"
import MiscSettingsPage from "./misc"
import UiSettingsPage from "./ui"

export default function SettingsPage() {
  return (
    <div className="flex w-[60rem] flex-col border-r">
      <div className="flex h-full">
        <div className="w-96 border-r">
          <TopAppBar content="設定" />
          <SettingsSectionBar tag="表示" href="/settings/ui" />
          <SettingsSectionBar tag="アカウント" href="/settings/account" />
          <SettingsSectionBar tag="その他" href="/settings/misc" />
        </div>
        <div className="flex w-[36rem] flex-col">
          <Router>
            <Route path="/settings/ui" component={UiSettingsPage} />
            <Route path="/settings/account" component={AccountSettingsPage} />
            <Route path="/settings/misc" component={MiscSettingsPage} />
            <Route default component={SettingsRedirect} />
          </Router>
        </div>
      </div>
    </div>
  )
}

function SettingsRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/settings/ui")
  }, [router])
  return null
}
