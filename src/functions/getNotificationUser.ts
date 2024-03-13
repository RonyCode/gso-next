import { fetchWrapper } from '@/functions/fetch'
import { UserNotification } from '../../types/index'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useNotificationStore } from '@/stores/user/useNotificationStore'

export const getUserNotification = async (
  queueName: string,
  exchangeName: string,
  idMessage: string | null | undefined,
) => {
  const notification = await fetchWrapper<UserNotification>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message?namequeue=${queueName}&exchangename=${exchangeName}&routingkey=${idMessage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (notification.messages?.length) {
    useNotificationStore.getState().actions.add(notification)
    return notification
  }
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
