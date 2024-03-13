'use client'

import { useNotificationStore } from '@/stores/user/useNotificationStore'
import { UserNotification } from '../../../types/index'

type AppInitializerProps = {
  userNotification: UserNotification | null
}

export default function UserNotifcationStoreInitialize({
  userNotification,
}: AppInitializerProps) {
  useNotificationStore.setState({ state: { notification: userNotification } })
  return null
}
