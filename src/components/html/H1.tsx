import { JSX } from "preact"

export default function H1(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="m-4 mb-2 font-extrabold text-4xl" {...props} />
}
