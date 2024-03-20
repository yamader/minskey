import { HTMLProps } from "react"

export default function H2(props: HTMLProps<HTMLHeadingElement>) {
  return <h2 className={"m-4 mb-1 text-xl font-bold"} {...props} />
}
