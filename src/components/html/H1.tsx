import { HTMLProps } from "react"

export default function H1(props: HTMLProps<HTMLHeadingElement>) {
  return <h1 className="m-4 mb-2 text-4xl font-extrabold" {...props} />
}
