import { type UserNotification } from '../../../../../types/index'

import { fetchWrapper } from '@/functions/fetch'

export const userNotification = (): {
  getNotificationUser: (
    queueName: string,
    exchangeName: string,
    idNessage: string | null | undefined,
  ) => Promise<UserNotification>
} => {
  async function getNotificationUser(
    queueName: string,
    exchangeName: string,
    idNessage: string | null | undefined,
  ): Promise<UserNotification> {
    return await fetchWrapper<UserNotification>(
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
