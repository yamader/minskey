"use client"

import Window from "~/components/Window"
import { useDebugWindow } from "~/features/debug"
import ApiSection from "./ApiSection"

export default function DebugWindow() {
  const [debugWindow, setDebugWindow] = useDebugWindow()

  return (
    debugWindow && (
      <Window onClose={() => setDebugWindow(false)}>
        <ApiSection />
      </Window>
    )
  )
}
