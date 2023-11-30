import { toast } from 'react-toastify';

import { fetchWrapper } from '@/functions/fetch';
import { CepProps } from '@/types';

export const useCep = () => {
  const findCep = async (cep: string) => {
    try {
      return fetchWrapper<CepProps>('/api/cep?cep=' + cep?.replace(/\D/g, ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      toast.error('Something went wrong with your login.');
      return {} as CepProps;
    }
  };

  return {
    findCep
  };
};
