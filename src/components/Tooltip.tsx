import { ComponentChildren } from "preact"

// title属性ベースの簡易Tooltip
export default function Tooltip({
  content,
  children,
}: {
  content: string
  children: ComponentChildren
}) {
  return <span title={content}>{children}</span>
}
