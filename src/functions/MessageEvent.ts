import { toast } from 'react-toastify';

import { fetchWrapper } from '@/functions/fetch';

type MessageEventProps = {
  messages: [];
  email: string;
  message: string;
  status: string;
  code: number;
};

export const MessageEvent = async (param: string, nameQueue: string) => {
  const resultEmail = await fetchWrapper<MessageEventProps>(
    `/api/message?namequeue=${nameQueue}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (resultEmail.code != 400) {
    resultEmail.messages.forEach((message: MessageEventProps) => {
      if (message.email === param) {
        toast.success(message.message);
      }
    });
  }

  if (resultEmail.code == 400) {
    toast.error('Erro ao eviar email, tente novamente! 🤯');
  }
};
