import { JSX } from 'preact'

export default function H2(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={'m-4 mb-1 font-bold text-xl'} {...props} />
}
