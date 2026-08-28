import { ComponentChildren } from 'preact'
import Button from '~/components/Button'
import { Link } from '~/router'

export default function LinkButton({ href, children }: { href: string; children: ComponentChildren }) {
  return (
    <Link href={href}>
      <Button>{children}</Button>
    </Link>
  )
}
