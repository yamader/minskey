import { useNavigate } from "@remix-run/react"
import { useEffect } from "react"
import { useLogin } from "~/features/auth"

export default function IndexPage() {
  const navigate = useNavigate()
  const login = useLogin()

  useEffect(() => {
    if (login) navigate("/home", { replace: true })
  }, [navigate, login])

  return (
    <>
      <div className="my-16 rounded-[2rem] border bg-lime-500 py-32 text-white">
        <h1 className="text-center font-inter text-8xl font-black">minskey</h1>
      </div>
    </>
  )
}