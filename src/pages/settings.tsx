import { useAtom } from "jotai"

import CommonLayout from "~/components/CommonLayout"
import { accountAtom } from "~/libs/atoms"

export default function Setings() {
  const [account, setAccount] = useAtom(accountAtom)

  const h2class = "pt-6 pb-2.5 text-xl font-bold"

  return (
    <CommonLayout>
      <h1 className="pb-8 pt-16 text-4xl font-black">設定</h1>
      <p>ほげほげ</p>

      {account && (
        <section>
          <h2 className={h2class}>トークンの設定</h2>
        </section>
      )}
    </CommonLayout>
  )
}
