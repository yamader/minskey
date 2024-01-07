import Header from "./Header"
import NotificationsProvider from "~/features/notifications/NotificationsProvider"
import TLProvider from "~/features/timeline/TLProvider"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <TLProvider>
      <NotificationsProvider>
        <div className="flex min-h-full flex-col bg-neutral-100">
          <main className="mx-auto flex w-full max-w-4xl grow flex-col px-4">
            <Header />
            {children}
          </main>
        </div>
      </NotificationsProvider>
    </TLProvider>
  )
}
