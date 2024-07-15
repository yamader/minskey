import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Settings = {
  version: number
  dark: boolean
  absDate: boolean
  ui: {
    rnav: string[]
  }
}

const rawSettingsAtom = atomWithStorage("minsk::settings", {})
const settingsAtom = atom(
  get => {
    const rawSettings = get(rawSettingsAtom)
    return settingsMigrator(rawSettings)
  },
  (_, set, update: Settings) => {
    set(rawSettingsAtom, update as object)
  },
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function settingsMigrator(settings: any): Settings {
  if (!settings.version || settings.version < 1) {
    settings.version = 0.1
    settings.dark ??= false
    settings.absDate ??= false
    settings.ui = {
      rnav: ["search"],
      ...settings.ui,
    }
  }

  return settings
}

export function useSettings() {
  return useAtom(settingsAtom)
}
