import { ReactNode } from "react"

import CommonFooter from "~/components/CommonFooter"

export default function CardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-y-scroll sm:bg-neutral-100">
      <div className="m-auto w-full max-w-xl bg-white p-8 sm:rounded-lg sm:drop-shadow-lg">{children}</div>
      <CommonFooter />
    </div>
  )
}
