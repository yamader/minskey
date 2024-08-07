import RawJson from "~/components/RawJson"
import H2 from "~/components/html/H2"
import { useSettings } from "~/features/settings"

export default function MiscSettingsPage() {
  const [settings] = useSettings()

  return (
    <>
      <H2>その他</H2>
      <hr />
      <H2>生データ</H2>
      <RawJson json={settings} />
      <hr />
    </>
  )
}
