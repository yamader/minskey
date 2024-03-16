import { Bell, Home, Settings } from "lucide-react"
import Link from "next/link"

const iconSize: string | number | undefined = 24

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 flex w-[36rem] justify-evenly bg-white p-3 lg:hidden">
      <Link href="/home/">
        <Home size={iconSize} />
      </Link>
      <Link href="/notifications/">
        <Bell size={iconSize} />
      </Link>
      <Link href="/settings/">
        <Settings size={iconSize} />
      </Link>
    </div>
  )
}
