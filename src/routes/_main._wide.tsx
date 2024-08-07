export default function MainWideLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-[60rem] flex-col border-r">{children}</div>
}
