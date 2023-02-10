import CommonLayout from "~/components/CommonLayout"

export default function AboutPage() {
  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <CommonLayout>
      <h1 className="pt-16 pb-8 text-4xl font-black">Help</h1>
      <h2 className={h2class}>ほげほげ</h2>
      <p>ふがふが</p>
    </CommonLayout>
  )
}
