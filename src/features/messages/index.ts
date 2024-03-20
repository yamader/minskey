import { use, useMemo } from "react"
import { useAPI } from "../api"

export const useDirectMessages = () => {
  const api = useAPI()
  const messages = useMemo(async () => await api?.directMessage() ?? null, [api])
  return use(messages)
}
