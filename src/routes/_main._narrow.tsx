import { Outlet } from "react-router"
import RightNav from "~/components/RightNav"

export default function MainNarrowLayout() {
  return (
    <>
      <div className="flex w-[36rem] flex-col">
        <Outlet />
      </div>
      <RightNav />
    </>
  )
}
