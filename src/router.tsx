import { JSX } from "preact"
import { Link as PreactLink, getCurrentUrl, useRouter as usePreactRouter } from "preact-router"
import { useMemo } from "preact/hooks"

export function Link(props: JSX.IntrinsicElements["a"]) {
  return <PreactLink {...props} />
}

export function usePathname() {
  const [args] = usePreactRouter()
  return args.url.split("?")[0]
}

export function useSearchParams() {
  const [args] = usePreactRouter()
  const search = args.url.split("?")[1] ?? ""
  return new URLSearchParams(search)
}

export function useRouter() {
  const [, route] = usePreactRouter()
  return useMemo(
    () => ({
      push: (to: string) => route(to),
      replace: (to: string) => route(to, true),
      back: () => history.back(),
    }),
    [route],
  )
}
