"use client"

import H2 from "~/components/html/H2"
import { useSettings } from "~/features/settings"

export default function GeneralSettingsPage() {
  const [settings] = useSettings()

  return (
    <>
      <H2>外観</H2>
      <hr />
    </>
  )
}
