'use client'
import { fetchWrapper } from '@/functions/fetch'

type MessageEventProps = {
  messages: []
  email: string
  message: string
  status: string
  code: number
}

export const messageRabbit = (
  queueName: string,
  exchangeName: string,
  routingKey: string | null | undefined,
) => {
  return fetchWrapper<MessageEventProps>(
    `/api/message?namequeue=${queueName}&exchangename=${exchangeName}&routingkey=${routingKey}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
