import { Route, Router, useRouter as usePreactRouter } from "preact-router"
import { useEffect } from "preact/hooks"

import BottomNav from "~/components/BottomNav"
import LeftNav from "~/components/LeftNav"
import RightNav from "~/components/RightNav"
import NoteDialog from "~/features/compose/NoteDialog"
import { useNotificationsStream } from "~/features/notification"
import { useTLStream } from "~/features/timeline"
import AboutPage from "~/pages/about"
import AuthPage from "~/pages/auth"
import ComposeNotePage from "~/pages/compose-note"
import HomePage from "~/pages/home"
import IndexPage from "~/pages/index"
import ListsPage from "~/pages/lists"
import LoginPage from "~/pages/login"
import NotePage from "~/pages/note"
import NotificationsPage from "~/pages/notifications"
import ProfilePage from "~/pages/profile"
import SettingsPage from "~/pages/settings"
import { useRouter } from "~/router"

export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/compose/note" component={ComposeNotePage} />
      <Route default component={MainShell} />
    </Router>
  )
}

function MainShell() {
  useTrailingSlashNormalizer()
  useTLStream()
  useNotificationsStream()

  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <div className="flex grow">
          <LeftNav />
          <Router>
            <Route path="/about" component={AboutColumn} />
            <Route path="/settings/:sub?" component={SettingsPage} />
            <Route default component={CenterColumn} />
          </Router>
        </div>
        <BottomNav />
      </div>
      <NoteDialog />
    </>
  )
}

function AboutColumn() {
  return (
    <div className="flex w-[60rem] flex-col border-r">
      <AboutPage />
    </div>
  )
}

function CenterColumn() {
  return (
    <>
      <div className="flex w-[36rem] flex-col">
        <Router>
          <Route path="/" component={IndexPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/lists" component={ListsPage} />
          <Route path="/note" component={NotePage} />
          <Route path="/notifications" component={NotificationsPage} />
          <Route path="/profile" component={ProfilePage} />
        </Router>
      </div>
      <RightNav />
    </>
  )
}

function useTrailingSlashNormalizer() {
  const router = useRouter()
  const [args] = usePreactRouter()
  const url = args.url

  useEffect(() => {
    const path = url.split("?")[0]
    if (path.length > 1 && path.endsWith("/")) {
      const search = url.split("?")[1]
      router.replace(path.replace(/\/+$/, "") + (search ? `?${search}` : ""))
    }
  }, [url, router])
}
