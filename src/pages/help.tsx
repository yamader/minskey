import CommonLayout from "~/components/CommonLayout"

export default function AboutPage() {
  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <CommonLayout>
      <h1 className="pb-8 pt-16 text-4xl font-black">Help</h1>
      <h2 className={h2class}>ほげほげ</h2>
      <p>ふがふが</p>
    </CommonLayout>
  )
}
