import CommonLayout from "~/components/CommonLayout"

export default function AboutPage() {
  return (
    <CommonLayout>
      <h1 className="pt-16 pb-8 text-4xl font-black">minskeyについて</h1>
      <h2 className="pt-6 pb-2.5 text-xl font-bold">概要</h2>
      <p>
        minskeyとは，(消極的な理由によって)最小限の機能のみを実装したMisskeyクライアントです。
        個人で細々と開発しているので，開発速度は遅めです。
      </p>
      <h2 className="pt-6 pb-2.5 text-xl font-bold">使い方</h2>
      <p>
        右上のログインボタンからアカウントを認証すれば使えるようになります。
        まだ仕様が固まっていないので，UI等はコロコロ変わるかもしれません。
      </p>
      <h2 className="pt-6 pb-2.5 text-xl font-bold">開発者向けのメッセージ</h2>
      <p>
        なんとなくNext.jsで開発しています(他にオススメがあれば教えてください)。
        静的にエクスポートできることに拘っていて，状態はローカルに保存するようにしています。
      </p>
    </CommonLayout>
  )
}
