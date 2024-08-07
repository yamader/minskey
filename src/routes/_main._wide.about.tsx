import H1 from "~/components/html/H1"
import H2 from "~/components/html/H2"
import P from "~/components/html/P"
import TopAppBar from "~/components/TopAppBar"

export default function AboutPage() {
  return (
    <>
      <TopAppBar content="戻る" back />
      <H1>minskeyについて</H1>
      <H2>概要</H2>
      <P>
        minskeyとは，(消極的な理由によって)最小限の機能のみを実装したMisskeyクライアントです。
        個人で細々と開発しているので，開発速度は遅めです。
      </P>
      <H2>使い方</H2>
      <P>
        右上のログインボタンからアカウントを認証すれば使えるようになります。
        まだ仕様が固まっていないので，UI等はコロコロ変わるかもしれません。
      </P>
      <H2>開発者向けのメッセージ</H2>
      <P>
        なんとなくNext.jsで開発しています(他にオススメがあれば教えてください)。
        静的にエクスポートできることに拘っていて，状態はローカルに保存するようにしています。
      </P>
      <H2>ソースコードとライセンス</H2>
      <P>
        ソースコードは
        <a
          className="mx-1 font-bold text-lime-500 hover:underline"
          href="https://github.com/yamader/minskey"
          target="_blank"
          rel="noreferrer">
          yamader/minskey
        </a>
        で頒布しています。ライセンスはMITです。
      </P>
      <H2>Contributer</H2>
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
