import * as RadioGroup from "@radix-ui/react-radio-group"
import { useAtom } from "jotai"
import { permissions } from "misskey-js"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"

import CardLayout from "~/components/CardLayout"
import { authSessionAtom } from "~/libs/atoms"

function MiAuthLogin() {
  type MiAuthForm = {
    host: string
  }

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<MiAuthForm>()
  const router = useRouter()
  const [, setAuthSession] = useAtom(authSessionAtom)

  const [location, setLocation] = useState<Location | null>(null)
  useEffect(() => {
    // ビルド時の値に依存したくない
    setLocation(window.location)
  }, [])

  const onSubmit = async ({ host }: MiAuthForm) => {
    const id = uuidv4(),
      name = "minskey",
      icon = location?.origin + "/icon.png",
      callback = location?.origin + "/auth",
      permission = permissions.join(",")

    try {
      const url = `https://${host}/miauth/${id}?name=${name}&icon=${icon}&callback=${callback}&permission=${permission}`
      setAuthSession({ id, host })
      router.push(url)
    } catch (e) {
      setAuthSession(null)
      setError("host", { type: "manual", message: e + "" })
    }
  }

  return (
    <form className="mx-10 my-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <label className="font-inter text-xl font-bold" htmlFor="login_host">
          Host
        </label>
        <input
          className="w-full rounded-md border-2 p-4 shadow-none focus:border-lime-400 focus:outline-none"
          id="login_host"
          placeholder="example.net"
          {...register("host", { required: "適切なホスト名を入力してください" })}
        />
        {errors.host && <p className="text-red-500">{errors.host.message}</p>}
      </div>
      <input
        className="w-full rounded-md bg-lime-500 py-2 font-inter text-xl font-bold text-white hover:bg-lime-400 active:bg-lime-300"
        type="submit"
        value="Next"
      />
    </form>
  )
}

function DirectLogin() {
  return (
    <form>
      <p className="my-16 text-center font-inter text-4xl font-bold">🚧 WIP 🚧</p>
    </form>
  )
}

export default function LoginPage() {
  const [method, setMethod] = useState("miauth") // "miauth" | "direct"

  return (
    <CardLayout>
      <h1 className="mb-10 mt-4 text-center font-inter text-6xl font-black">Login</h1>
      <RadioGroup.Root
        className="grid grid-flow-col justify-center gap-4"
        value={method}
        onValueChange={val => setMethod(val)}>
        <RadioGroup.Item
          className="flex h-14 w-52 items-center rounded-md border-2 rdx-state-checked:border-lime-400"
          id="method_miauth"
          value="miauth">
          <div className="m-3 h-5 w-5 rounded-full border border-gray-200 bg-gray-100">
            <RadioGroup.Indicator className="flex h-full w-full items-center justify-center after:h-2.5 after:w-2.5 after:rounded-full after:bg-black rdx-state-checked:after:content-['']" />
          </div>
          <label className="flex h-full grow items-center" htmlFor="method_miauth">
            MiAuth
          </label>
        </RadioGroup.Item>
        <RadioGroup.Item
          className="flex h-14 w-52 items-center rounded-md border-2 rdx-state-checked:border-lime-400"
          id="method_direct"
          value="direct">
          <div className="m-3 h-5 w-5 rounded-full border border-gray-200 bg-gray-100">
            <RadioGroup.Indicator className="flex h-full w-full items-center justify-center after:h-2.5 after:w-2.5 after:rounded-full after:bg-black rdx-state-checked:after:content-['']" />
          </div>
          <label className="flex h-full grow items-center" htmlFor="method_direct">
            <span>Direct</span>
          </label>
        </RadioGroup.Item>
      </RadioGroup.Root>
      {method === "miauth" && <MiAuthLogin />}
      {method === "direct" && <DirectLogin />}
    </CardLayout>
  )
}
