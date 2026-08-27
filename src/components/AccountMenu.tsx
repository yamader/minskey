import clsx from "clsx"
import { Check, Menu } from "lucide-preact"
import AccountBar from "~/components/AccountBar"
import Dropdown from "~/components/Dropdown"
import { isSameAccount, useAuth } from "~/features/auth"
import { Link } from "~/router"

export default function AccountMenu() {
  const { account, multiAccounts, setAuth, logout } = useAuth()

  const actionBtn =
    "!cursor-pointer rounded-lg outline-none transition hover:bg-neutral-100 hover:text-inherit active:bg-neutral-200"
  return (
    <Dropdown
      triggerClassName="cursor-pointer select-none"
      trigger={
        <div className="flex cursor-pointer select-none items-center justify-between rounded-full p-2 transition hover:bg-neutral-100">
          <AccountBar
            // biome-ignore lint/style/noNonNullAssertion: ログイン時のみ表示されるため
            account={account!}
            omake={<Menu className="mr-2.5 text-neutral-500" size={18} />}
          />
        </div>
      }
      menuClassName="absolute right-0 z-50 mt-1 w-64 rounded-xl border bg-white py-1 shadow-md">
      <div className="flex w-64 flex-col gap-1">
        {multiAccounts.map((e, i) =>
          isSameAccount(e, account) ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: アカウント順が固定のため
            <div className="h-fit p-2" key={i}>
              <AccountBar
                account={e}
                omake={<Check className="stroke-[4] text-misskey" size={16} />}
              />
            </div>
          ) : (
            <button
              type="button"
              className="!h-fit !w-full !cursor-pointer !p-2 rounded-lg outline-none transition hover:bg-neutral-100"
              onClick={() => setAuth({ account: e })}
              // biome-ignore lint/suspicious/noArrayIndexKey: アカウント順が固定のため
              key={i}
            >
              <AccountBar account={e} omake={null} />
            </button>
          ),
        )}
      </div>
      <hr className="h-px bg-neutral-200" />
      <div className="flex flex-col gap-1 py-1">
        <Link className={actionBtn + " block px-3 py-2"} href="/login">
          アカウントを追加
        </Link>
        <button
          type="button"
          className={clsx(actionBtn, "w-full px-3 py-2 text-left")}
          onClick={() => alert("できたらええな〜")}>
          アカウントを管理
        </button>
        <button
          type="button"
          className={clsx(
            actionBtn,
            "w-full px-3 py-2 text-left font-bold text-red-500 hover:bg-red-100 active:bg-red-200",
          )}
          onClick={() => confirm("ほんまに？") && logout()}>
          ログアウト
        </button>
      </div>
    </Dropdown>
  )
}
