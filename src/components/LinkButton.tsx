import { ReactNode } from "react"
import Button from "~/components/Button"
import Link from "~/components/Link"

export default function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link to={href}>
      <Button>{children}</Button>
    </Link>
  )
}
