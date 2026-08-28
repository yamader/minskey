import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Home,
  LayoutGrid,
  List,
  Pen,
  Settings,
  User,
} from "lucide-preact"
import { ComponentChildren } from "preact"
import AccountMenu from "~/components/AccountMenu"
import { usePathname, useRouter } from "~/router"
import { useDeckComposeOpen, useDeckNavCollapsed } from "."

const navItems: { sub: string | null; label: string; icon: ComponentChildren }[] = [
  { sub: "home", label: "ホーム", icon: <Home size={20} /> },
  { sub: "notifications", label: "通知", icon: <Bell size={20} /> },
  { sub: "lists", label: "リスト", icon: <List size={20} /> },
  { sub: null, label: "デッキ", icon: <LayoutGrid size={20} /> },
  { sub: "settings", label: "設定", icon: <Settings size={20} /> },
  { sub: "profile", label: "プロフィール", icon: <User size={20} /> },
]

export default function DeckNav() {
  const router = useRouter()
  const [collapsed, setCollapsed] = useDeckNavCollapsed()
  const [composeOpen, setComposeOpen] = useDeckComposeOpen()
  const pathname = usePathname()
  const sub = pathname.split("/")[2] ?? null

  const open = (item: { sub: string | null }) =>
    router.push(item.sub ? `/deck/${item.sub}` : "/deck")

  return (
    <div
      className={
        "flex h-full shrink-0 flex-col border-r bg-white transition-all " +
        (collapsed ? "w-16" : "w-52")
      }>
      <div className="p-2">
        <button
          type="button"
          title="新しい投稿"
          className={
            "flex items-center gap-3 rounded-lg bg-lime-500 p-3 font-bold text-white hover:bg-lime-600 " +
            (composeOpen && "bg-lime-600") +
            (collapsed ? " w-fit rounded-full p-2" : "w-full")
          }
          onClick={() => setComposeOpen(!composeOpen)}>
          <Pen size={18} />
          {!collapsed && "新しい投稿"}
        </button>
      </div>
      <div className="grow p-2">
        {navItems.map(item => (
          <button
            key={item.sub ?? "/deck"}
            type="button"
            className={
              "flex w-full items-center gap-3 rounded-lg p-3 hover:bg-neutral-100 " +
              (item.sub === sub && "font-bold") +
              (collapsed ? " justify-center" : "")
            }
            onClick={() => open(item)}>
            {item.icon}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <AccountMenu compact={collapsed} />
        <div className="flex justify-center border-t p-2">
          <button
            type="button"
            className="rounded p-2 text-neutral-500 hover:bg-neutral-100"
            title={collapsed ? "展開" : "折りたたみ"}
            onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}
