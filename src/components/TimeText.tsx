import { TimeHTMLAttributes } from "react"

import { useSettings } from "~/features/settings"

type TimeTextProps = TimeHTMLAttributes<HTMLTimeElement> & { dateTime: string }

function reltime(rawdate: string): string {
  const diffsec = Math.round((Date.now() - new Date(rawdate).valueOf()) / 1000) //秒
  const diffmin = Math.round(diffsec / 60) //分
  const diffhour = Math.round(diffmin / 60) //時間
  const diffday = Math.round(diffhour / 24)
  if (diffsec < 20) {
    return `今`
  }
  if (diffmin < 1) {
    return `${diffsec}秒前`
  } else if (diffhour < 1) {
    return `${diffmin}分前`
  } else if (diffday < 1) {
    return `${diffhour}時間前`
  } else {
    return `${diffday}日前`
  }
}

function abstime(rawdate: string): string {
  return new Date(rawdate).toISOString().slice(0, -1).split("T").join(" ")
}

export default function TimeText({ dateTime, ...props }: TimeTextProps) {
  const [settings] = useSettings()

  return (
    <time dateTime={abstime(dateTime)} {...props}>
      {settings.absDate ? dateTime : reltime(dateTime)}
    </time>
  )
}
