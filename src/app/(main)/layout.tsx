import CommonFooter from "~/components/CommonFooter"

import Header from "./Header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto w-full max-w-4xl grow px-4">
        <Header />
        {children}
      </div>
      <CommonFooter />
    </div>
  )
}
