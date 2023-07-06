import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// atoms

type Settings = {
  version: number
  dark: boolean
}

const rawSettingsAtom = atomWithStorage("minsk::settings", {})
export const settingsAtom = atom(
  get => {
    const rawSettings = get(rawSettingsAtom)
    return settingsMigrator(rawSettings)
  },
  (_, set, update: Settings) => {
    set(rawSettingsAtom, update as object)
  }
)

// hooks

export function useSettings() {
  return useAtom(settingsAtom)
}

// utils

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function settingsMigrator(settings: any): Settings {
  if (!settings.version || settings.version < 0) {
    settings.version = 0
    settings.dark = false
  }

  return settings
}
