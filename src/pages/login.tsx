import { useEffect, useState } from "preact/hooks"
import { v4 as uuidv4 } from "uuid"
import { useForm } from "~/components/useForm"
import { detect } from "~/features/api/clients"
import { permissions, useAuth } from "~/features/auth"
import { useRouter, useSearchParams } from "~/router"
import { ensureproto } from "~/utils"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [method, setMethod] = useState("miauth") // "miauth" | "direct"

  const { error, setAuth } = useAuth()
  const [prevError, setPrevError] = useState<string | null>(null)
  useEffect(() => {
    if (error) {
      setPrevError(error)
      setAuth({ error: null })
    }
  }, [error, setAuth])

  const go = searchParams.get("go") || "/home"
  const host = searchParams.get("host") ?? undefined

  return (
    <>
      <h1 className="mt-4 mb-10 text-center font-black font-inter text-6xl">Login</h1>
      <RadioGroup
        className="grid grid-flow-col justify-center gap-4"
        value={method}
        onValueChange={val => setMethod(val)}
        options={[
          { value: "miauth", label: "MiAuth", id: "method_miauth" },
          { value: "direct", label: "Manual", id: "method_direct" },
        ]}
      />
      <div className="mx-10 my-4">
        <p className="text-red-500">{prevError}</p>
        {method === "miauth" && <MiAuthLogin go={go} host={host} />}
        {method === "direct" && <ManualLogin go={go} host={host} />}
        <button
          className="w-full rounded-md border-2 bg-neutral-100 py-2 font-bold font-inter text-lime-500 text-xl hover:bg-lime-200 active:bg-lime-300"
          onClick={router.back}>
          back
        </button>
      </div>
    </>
  )
}

type LoginProps = {
  go: string
  host?: string
}

function MiAuthLogin({ go, host }: LoginProps) {
  type MiAuthForm = {
    host: string
  }

  const form = useForm<MiAuthForm>()
  const { setAuth } = useAuth()

  const [location, setLocation] = useState<Location | null>(null)
  useEffect(() => {
    // ビルド時の値に依存したくない
    setLocation(window.location)
  }, [])

  const onSubmit = async ({ host }: MiAuthForm) => {
    const realHost = ensureproto(host)
    const sid = uuidv4()
    const name = "minskey"
    const icon = location?.origin + "/favicon.png"
    const callback = location?.origin + `/auth?go=${go}`
    const permission = permissions.join(",")

    const client = await detect(realHost)
    if (!client) {
      form.setError("host", {
        type: "manual",
        message: "対応していないインスタンスか間違ったURLです",
      })
      return
    }

    try {
      const url = `${realHost}/miauth/${sid}?name=${name}&icon=${icon}&callback=${callback}&permission=${permission}`
      setAuth({ session: { sid, host: realHost } })
      window.location.href = url
    } catch (e) {
      form.setError("host", { type: "manual", message: e + "" })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="my-4">
        <label className="font-bold font-inter text-xl" htmlFor="login_host">
          Host
        </label>
        <input
          className="w-full rounded-md border-2 p-4 shadow-none focus:border-lime-400 focus:outline-none"
          id="login_host"
          placeholder="example.net"
          {...form.register("host", { required: "適切なホスト名を入力してください", value: host })}
        />
        {form.errors.host && <p className="text-red-500">{form.errors.host.message}</p>}
      </div>
      <input
        className="my-2 w-full rounded-md bg-lime-500 py-2 font-bold font-inter text-white text-xl hover:bg-lime-400 active:bg-lime-300"
        type="submit"
        value="Next"
      />
    </form>
  )
}

function ManualLogin({ go, host }: LoginProps) {
  type ManualLoginForm = {
    host: string
    token: string
  }

  const form = useForm<ManualLoginForm>()
  const router = useRouter()
  const { setAuth, addMultiAccount } = useAuth()

  const onSubmit = async ({ host, token }: ManualLoginForm) => {
    const realHost = ensureproto(host)
    const testurl = `${realHost}/api/i`
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ i: token }),
    }

    try {
      const res = await fetch(testurl, req)
      if (res.ok) {
        const { id } = await res.json()
        const account = { host: realHost, uid: id, token }
        setAuth({
          account: account,
          session: null,
          error: null,
        })
        addMultiAccount(account)
        router.push(go)
      } else {
        form.setError("token", { type: "manual", message: "auth failed" })
      }
    } catch (e) {
      form.setError("host", { type: "manual", message: e + "" })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="my-4">
        <label className="font-bold font-inter text-xl" htmlFor="login_host">
          Host
        </label>
        <input
          className="w-full rounded-md border-2 p-4 shadow-none focus:border-lime-400 focus:outline-none"
          id="login_host"
          placeholder="example.net"
          {...form.register("host", { required: "適切なホスト名を入力してください", value: host })}
        />
        {form.errors.host && <p className="text-red-500">{form.errors.host.message}</p>}
      </div>
      <div className="my-4">
        <label className="font-bold font-inter text-xl" htmlFor="login_token">
          Token
        </label>
        <input
          className="w-full rounded-md border-2 p-4 shadow-none focus:border-lime-400 focus:outline-none"
          id="login_token"
          placeholder="AbCdEfGhIjKlMnOpQrStUvWxYz012345"
          {...form.register("token", { required: "適切なアクセストークンを入力してください" })}
        />
        {form.errors.token && <p className="text-red-500">{form.errors.token.message}</p>}
      </div>
      <input
        className="my-2 w-full rounded-md bg-lime-500 py-2 font-bold font-inter text-white text-xl hover:bg-lime-400 active:bg-lime-300"
        type="submit"
        value="Next"
      />
    </form>
  )
}

function RadioGroup({
  value,
  onValueChange,
  options,
  className,
}: {
  value: string
  onValueChange: (val: string) => void
  options: { value: string; label: string; id: string }[]
  className?: string
}) {
  return (
    <div className={className} role="radiogroup">
      {options.map(option => {
        const checked = value === option.value
        return (
          <button
            type="button"
            key={option.value}
            role="radio"
            aria-checked={checked}
            id={option.id}
            className={
              "flex h-14 w-52 items-center rounded-md border-2 " +
              (checked ? "border-lime-400" : "border-neutral-300")
            }
            onClick={() => onValueChange(option.value)}>
            <div className="m-3 h-5 w-5 rounded-full border border-gray-200 bg-gray-100">
              {checked && (
                <div className="flex h-full w-full items-center justify-center after:h-2.5 after:w-2.5 after:rounded-full after:bg-black" />
              )}
            </div>
            <label className="flex h-full grow items-center" htmlFor={option.id}>
              {option.label}
            </label>
          </button>
        )
      })}
    </div>
  )
}
