import RightNav from "./RightNav"

export default function MainNarrowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-[36rem] flex-col">{children}</div>
      <RightNav />
    </>
  )
}
