import { Bell, Home, Settings } from "lucide-react"

const iconSize: string | number | undefined = 24

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 flex w-[36rem] justify-evenly bg-white p-3 lg:hidden">
      <Home size={iconSize} />
      <Bell size={iconSize} />
      <Settings size={iconSize} />
    </div>
  )
}
