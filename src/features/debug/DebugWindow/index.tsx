import { useDebugWindow } from '~/features/debug'
import Window from '~/features/window/Window'
import ApiSection from './ApiSection'

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
