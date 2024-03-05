import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { User } from "~/features/api/clients/entities"

const logginedCacheAtom = atomWithStorage<User[]>("minsk::auth::loggined", [])

export const useLogginedCache = () => {
  const [logginedCache, setlogginedCache] = useAtom(logginedCacheAtom)

  const addLoggined = (user: User) => {
    const newUser = [user, ...logginedCache]
    setlogginedCache(newUser)
  }

  return {
    logginedCache,
    addLoggined,
  }
}
