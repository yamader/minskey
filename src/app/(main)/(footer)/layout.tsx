import Footer from "~/features/common/Footer"

export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  )
}
