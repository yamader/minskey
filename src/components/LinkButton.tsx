import Link from "next/link"
import { ReactNode } from "react"

import Button from "./Button"

export default function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href}>
      <Button>{children}</Button>
    </Link>
  )
}
