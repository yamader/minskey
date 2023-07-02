import CommonLayout from "~/components/CommonLayout"

export default function AboutPage() {
  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <CommonLayout>
      <h1 className="pb-8 pt-16 text-4xl font-black">Help</h1>
      <h2 className={h2class}>機能がない</h2>
      <p>仕様です。</p>
      <h2 className={h2class}>エラーが出る</h2>
      <p>仕様です。</p>
    </CommonLayout>
  )
}
