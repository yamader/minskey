import { HTMLProps } from "react"

export default function H3(props: HTMLProps<HTMLHeadingElement>) {
  return <h2 className={"mx-4 my-2 mb-1 font-bold text-lg"} {...props} />
}
