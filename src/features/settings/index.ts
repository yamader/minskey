import { computed } from "@preact/signals"
import { persistedSignal } from "~/utils"

type HomeTL = "homeTimeline" | "localTimeline" | "globalTimeline"

export type HomeDisplay = HomeTL | `list:${string}`

type Settings = {
  version: number
  dark: boolean
  absDate: boolean
  ui: {
    rnav: string[]
    homePins: HomeDisplay[]
    deck: HomeDisplay[]
  }
}

const rawSettingsSignal = persistedSignal<Record<string, unknown>>("minsk::settings", {})
const settingsSignal = computed(() => settingsMigrator(rawSettingsSignal.value))

function settingsMigrator(raw: Record<string, unknown>): Settings {
  const settings = raw as Settings & Record<string, unknown>
  if (!settings.version || settings.version < 1) {
    settings.version = 0.1
    settings.dark ??= false
    settings.absDate ??= false
    settings.ui = {
      ...(settings.ui as Settings["ui"]),
      rnav: ["search"],
      homePins: settings.ui?.homePins ?? ["homeTimeline", "localTimeline", "globalTimeline"],
      deck: settings.ui?.deck ?? ["homeTimeline", "localTimeline", "globalTimeline"],
    }
  }
  return settings
}

export function useSettings() {
  return [
    settingsSignal.value,
    (update: Settings) => {
      rawSettingsSignal.value = update as unknown as Record<string, unknown>
    },
  ] as const
}
