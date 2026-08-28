import { JSX } from 'preact'

export default function P(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="mx-4" {...props} />
}
