import { fetchWrapper } from '@/functions/fetch'
import { UserNotification } from '../../../../../types/index'

export const userNotification = () => {
  function getNotificationUser(
    queueName: string,
    exchangeName: string,
    idNessage: string | null | undefined,
  ) {
    return fetchWrapper<UserNotification>(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message?namequeue=${queueName}&exchangename=${exchangeName}&routingkey=${idNessage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
  return { getNotificationUser }
}
