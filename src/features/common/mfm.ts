import { useEffect } from "react"
import { useMfmConfig } from "react-mfm"
import CustomEmoji from "./CustomEmoji"

export function useMfmProvider() {
  const [, setMfmConfig] = useMfmConfig()

  useEffect(() => {
    setMfmConfig(config => ({
      ...config,
      CustomEmoji,
    }))
  }, [setMfmConfig])
}
