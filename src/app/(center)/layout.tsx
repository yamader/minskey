import Footer from "~/components/Footer"

export default function CenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-y-scroll sm:bg-neutral-100">
      <div className="m-auto w-full max-w-xl bg-white p-8 sm:rounded-lg sm:drop-shadow-lg">
        {children}
      </div>
      <Footer />
    </div>
  )
}
