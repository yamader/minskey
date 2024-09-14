import { atom } from "jotai"
import { useEffect } from "react"
import { useImmer } from "use-immer"

type WindowMeta = {
  id: number
}

const windowsAtom = atom<{
  windows: WindowMeta[]
  currentId: number // 大丈夫？
}>({
  windows: [],
  currentId: 0,
})

export default function Window({
  onClose,
  children,
}: {
  onClose?: () => void
  children: React.ReactNode
}) {
  const [w, updateW] = useImmer({
    x: 100,
    y: 100,
    w: 500,
    h: 500,
    grab: false,
    grabX: 0,
    grabY: 0,
  })

  useEffect(() => {
    function mousemove(e: MouseEvent) {
      updateW(d => {
        if (d.grab) {
          d.x = Math.max(0, e.clientX - d.grabX)
          d.y = Math.max(0, e.clientY - d.grabY)
        }
      })
    }

    function mouseup() {
      updateW(d => {
        d.grab = false
      })
    }

    document.addEventListener("mousemove", mousemove)
    document.addEventListener("mouseup", mouseup)
    return () => {
      document.removeEventListener("mousemove", mousemove)
      document.removeEventListener("mouseup", mouseup)
    }
  }, [updateW])

  return (
    <div
      className="fixed top-0 flex flex-col gap-1 rounded-lg bg-neutral-600 bg-opacity-50 p-1.5 shadow backdrop-blur-lg will-change-[top,left,width,height]"
      style={{
        top: w.y + "px",
        left: w.x + "px",
        width: w.w + "px",
        height: w.h + "px",
      }}>
      <nav
        className="flex select-none items-center justify-end"
        onMouseDown={e =>
          updateW(d => {
            d.grab = true
            d.grabX = e.nativeEvent.offsetX
            d.grabY = e.nativeEvent.offsetY
          })
        }>
        <button
          className="rounded-full p-0.5 font-black text-stone-600 leading-none hover:bg-neutral-300"
          onClick={onClose}>
          &times;
        </button>
      </nav>
      <div className="h-full overflow-auto rounded bg-white">{children}</div>
    </div>
  )
}
