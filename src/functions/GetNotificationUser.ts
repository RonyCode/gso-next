import { type UserNotification } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'
import { useNotificationStore } from '@/stores/user/useNotificationStore'

export const GetUserNotification = async (
  queueName: string,
  exchangeName: string,
  idMessage: string | null | undefined,
): Promise<UserNotification> => {
  const notification = await fetchWrapper<UserNotification>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message?namequeue=${queueName}&exchangename=${exchangeName}&routingkey=${idMessage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (notification.messages?.length !== 0 && notification.code !== 400) {
    useNotificationStore.getState().actions.add(notification)
    return notification
  } else {
    return {
      messages: [],
      id: '',
      title: '',
      type: '',
      qtd: 0,
      status: '',
      code: 0,
    }
  }
}
