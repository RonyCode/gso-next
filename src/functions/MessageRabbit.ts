import { fetchWrapper } from '@/functions/fetch'

type MessageEventProps = {
  messages: []
  email: string
  message: string
  status: string
  code: number
}

export const MessageRabbit = async (param: string, nameQueue: string) => {
  return await fetchWrapper<MessageEventProps>(
    `/api/message?namequeue=${nameQueue}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
