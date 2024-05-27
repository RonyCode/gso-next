'use client'

import { type UserNotification } from '../../../types/index'

import { useNotificationStore } from '@/stores/user/useNotificationStore'

interface AppInitializerProps {
  userNotification: UserNotification | null
}

export default function UserNotifcationStoreInitialize({
  userNotification,
}: AppInitializerProps): null {
  useNotificationStore.setState({ state: { notification: userNotification } })
  return null
}
