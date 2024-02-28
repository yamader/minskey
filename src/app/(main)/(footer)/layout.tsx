import Footer from "~/components/Footer"

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
