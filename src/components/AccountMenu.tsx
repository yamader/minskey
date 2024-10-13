import { DropdownMenu } from "@radix-ui/themes"
import clsx from "clsx"
import { Check, Menu } from "lucide-react"
import { Link } from "react-router"
import AccountBar from "~/components/AccountBar"
import { isSameAccount, useAuth } from "~/features/auth"

export default function AccountMenu() {
  const { account, multiAccounts, setAuth, logout } = useAuth()

  const actionBtn =
    "!cursor-pointer rounded-lg outline-none transition hover:bg-neutral-100 hover:text-inherit active:bg-neutral-200"
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex cursor-pointer select-none items-center justify-between rounded-full p-2 transition hover:bg-neutral-100">
          <AccountBar
            account={account!} // <AccountMenu /> should only show when logged in
            omake={<Menu className="mr-2.5 text-neutral-500" size={18} />}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="rounded-xl">
        <div className="flex w-64 flex-col gap-1">
          {multiAccounts.map((e, i) =>
            isSameAccount(e, account) ? (
              <div className="h-fit p-2" key={i}>
                <AccountBar
                  account={e}
                  omake={<Check className="stroke-[4] text-misskey" size={16} />}
                />
              </div>
            ) : (
              <DropdownMenu.Item
                className="!h-fit !cursor-pointer !p-2 rounded-lg outline-none transition hover:bg-neutral-100"
                onSelect={() => setAuth({ account: e })}
                key={i}>
                <AccountBar account={e} omake={null} />
              </DropdownMenu.Item>
            ),
          )}
        </div>
        <DropdownMenu.Separator />
        <DropdownMenu.Item asChild>
          <Link className={actionBtn} to="/login/">
            アカウントを追加
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={actionBtn} onClick={() => alert("できたらええな〜")}>
          アカウントを管理
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <button
            type="button"
            className={clsx(actionBtn, "font-bold text-red-500 hover:bg-red-100 active:bg-red-200")}
            onClick={() => confirm("ほんまに？") && logout()}>
            ログアウト
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
