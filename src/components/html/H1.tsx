import { HTMLProps } from "react"

export default function H1(props: HTMLProps<HTMLHeadingElement>) {
  return <h1 className="m-4 mb-2 font-extrabold text-4xl" {...props} />
}
