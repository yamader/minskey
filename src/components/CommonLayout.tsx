import { ReactNode } from "react"

import CommonFooter from "~/components/CommonFooter"
import CommonHeader from "~/components/CommonHeader"

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto w-full max-w-4xl grow px-4">
        <CommonHeader />
        {children}
      </div>
      <CommonFooter />
    </div>
  )
}
