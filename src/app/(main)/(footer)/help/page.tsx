export default function HelpPage() {
  const h2class = "pt-6 pb-2.5 text-xl font-bold"
  const aclass = "mx-1 font-bold text-lime-500 hover:underline"

  return (
    <>
      <h1 className="pb-8 pt-16 text-4xl font-black">Help</h1>
      <h2 className={h2class}>機能がない</h2>
      <p>
        Minskeyは現在開発中です。<a href="https://github.com/yamader/minskey/issues/4" target="_blank" className={aclass}>Issue #4</a>
        で進捗を確認してください。
      </p>
      <h2 className={h2class}>エラーが出る</h2>
      <p>
        <a className={aclass} href="https://github.com/yamader/minskey/issue" target="_blank" rel="noreferrer">
          yamader/minskey
        </a>
        で報告してください。
      </p>
    </>
  )
}
