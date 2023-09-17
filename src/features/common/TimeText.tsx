import { TimeHTMLAttributes } from "react"

import { abstime, reltime } from "."
import { useSettings } from "~/features/settings"

type TimeTextProps = TimeHTMLAttributes<HTMLTimeElement> & { dateTime: string }

export default function TimeText({ dateTime, ...props }: TimeTextProps) {
  const [settings] = useSettings()

  return (
    <time dateTime={abstime(dateTime)} {...props}>
      {settings.absDate ? dateTime : reltime(dateTime)}
    </time>
  )
}
