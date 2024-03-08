export default function AboutPage() {
  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <>
      <h1 className="pb-8 pt-16 text-4xl font-black">minskeyについて</h1>
      <h2 className={h2class}>概要</h2>
      <p>
        minskeyとは，(消極的な理由によって)最小限の機能のみを実装したMisskeyクライアントです。
        個人で細々と開発しているので，開発速度は遅めです。
      </p>
      <h2 className={h2class}>使い方</h2>
      <p>
        右上のログインボタンからアカウントを認証すれば使えるようになります。
        まだ仕様が固まっていないので，UI等はコロコロ変わるかもしれません。
      </p>
      <h2 className={h2class}>開発者向けのメッセージ</h2>
      <p>
        なんとなくNext.jsで開発しています(他にオススメがあれば教えてください)。
        静的にエクスポートできることに拘っていて，状態はローカルに保存するようにしています。
      </p>
      <h2 className={h2class}>ソースコードとライセンス</h2>
      <p>
        ソースコードは
        <a
          className="mx-1 font-bold text-lime-500 hover:underline"
          href="https://github.com/yamader/minskey"
          target="_blank"
          rel="noreferrer">
          yamader/minskey
        </a>
        で頒布しています。ライセンスはMITです。
      </p>
      <h2 className={h2class}>Contributer</h2>
      <ul className="list-disc pl-10">
        <li>
          <a className="hover:underline" href="https://yamad.me">
            YamaD
          </a>
        </li>
        <li>
          <a className="hover:underline" href="https://www.hayao0819.com">
            Hayao
          </a>
        </li>
      </ul>
    </>
  )
}
