import { HTMLProps } from "react"

export default function P(props: HTMLProps<HTMLParagraphElement>) {
  return <p className="mx-4" {...props} />
}
