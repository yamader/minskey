export * from './types'

import { hostname } from '~/utils'
import { User, UserStatus } from '.'

export function statusEmoji(status: UserStatus = 'unknown') {
  switch (status) {
    case 'online':
      return '🟢'
    case 'active':
      return '🟡'
    case 'offline':
      return '💤'
    case 'unknown':
      return '❓'
  }
}

export function profileLink(user: User) {
  const host = user.host && hostname(user.host)
  return `/profile?user=@${user.username}@${host}`
}
