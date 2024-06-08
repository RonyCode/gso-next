'use client'

import { useNotificationStore } from '@/stores/user/useNotificationStore'
import { type UserNotification } from '@/types/index'

interface AppInitializerProps {
  userNotification: UserNotification | null
}

export default function UserNotifcationStoreInitialize({
  userNotification,
}: AppInitializerProps): null {
  useNotificationStore.setState({ state: { notification: userNotification } })
  return null
}
