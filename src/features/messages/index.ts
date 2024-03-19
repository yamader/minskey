import { use, useMemo } from "react"
import { useAPI } from "../api"

export const useDirectMessages = () => {
  const api = useAPI()
  const messages = use(useMemo(async () => await api?.directMessage(), [api]))
  return messages
}
