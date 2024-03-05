import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { User } from "~/features/api/clients/entities"

const logginedCacheAtom = atomWithStorage<{ [id: string]: User }>("minsk::auth::loggined", {})

export const useLogginedCache = () => {
  const [logginedCache, setlogginedCache] = useAtom(logginedCacheAtom)

  const addLoggined = (user: User) => {
    setlogginedCache({
      ...logginedCache,
      [user.id]: user,
    })
  }

  return {
    logginedCache,
    addLoggined,
  }
}
