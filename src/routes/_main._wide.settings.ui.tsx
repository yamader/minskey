import RawJson from "~/components/RawJson"
import H2 from "~/components/html/H2"
import H3 from "~/components/html/H3"
import { useSettings } from "~/features/settings"

export default function GeneralSettingsPage() {
  const [settings] = useSettings()

  return (
    <>
      <H2>外観</H2>
      <H3>右のバー</H3>
      <RawJson json={settings.ui.rnav} />
      <hr />
    </>
  )
}
