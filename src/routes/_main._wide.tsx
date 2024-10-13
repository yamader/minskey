import { Outlet } from "react-router"

export default function MainWideLayout() {
  return (
    <div className="flex w-[60rem] flex-col border-r">
      <Outlet />
    </div>
  )
}
