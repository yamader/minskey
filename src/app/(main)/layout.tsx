import Header from "./Header"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-4">
      <Header />
      <div className="flex grow flex-col">{children}</div>
    </div>
  )
}
