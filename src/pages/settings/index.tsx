import { Route, Router } from 'preact-router'
import SettingsSectionBar from '~/components/SettingsSectionBar'
import TopAppBar from '~/components/TopAppBar'
import { usePathname } from '~/router'
import AccountSettingsPage from './account'
import MiscSettingsPage from './misc'
import UiSettingsPage from './ui'

export default function SettingsPage() {
  const base = usePathname().startsWith('/deck') ? '/deck/settings' : '/settings'

  return (
    <div className="flex w-240 flex-col border-r">
      <div className="flex h-full">
        <div className="w-96 border-r">
          <TopAppBar content="設定" />
          <SettingsSectionBar tag="表示" href={`${base}/ui`} />
          <SettingsSectionBar tag="アカウント" href={`${base}/account`} />
          <SettingsSectionBar tag="その他" href={`${base}/misc`} />
        </div>
        <div className="flex w-xl flex-col">
          <Router>
            <Route path={`${base}/ui`} component={UiSettingsPage} />
            <Route path={`${base}/account`} component={AccountSettingsPage} />
            <Route path={`${base}/misc`} component={MiscSettingsPage} />
            <Route default component={UiSettingsPage} />
          </Router>
        </div>
      </div>
    </div>
  )
}
