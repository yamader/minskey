import { Bell, Home, Settings } from "lucide-react"
import { Link } from "react-router"

const iconSize: string | number | undefined = 24

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 flex w-[36rem] justify-evenly bg-white p-3 lg:hidden">
      <Link to="/home/">
        <Home size={iconSize} />
      </Link>
      <Link to="/notifications/">
        <Bell size={iconSize} />
      </Link>
      <Link to="/settings/">
        <Settings size={iconSize} />
      </Link>
    </div>
  )
}
