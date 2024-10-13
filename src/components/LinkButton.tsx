import { ReactNode } from "react"
import { Link } from "react-router"
import Button from "~/components/Button"

export default function LinkButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  )
}
