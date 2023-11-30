import { UserType } from '@/types';
import { create } from 'zustand';

type ActionsProps = {
  add: (user: UserType) => void;
};

type UserStore = {
  state: { user: UserType };
  actions: ActionsProps;
};

export const useUserStore = create<UserStore>()((set) => {
  return {
    state: {
      user: {
        nome: '',
        email: '',
        cpf: '',
        data_nascimento: '',
        telefone: '',
        cep: '',
        estado: '',
        endereco: '',
        bairro: '',
        numero: '',
        cidade: '',
        confirmaSenha: '',
        senha: ''
      }
    },
    actions: {
      add: (user: UserType) =>
        set((state) => ({
          state: {
            user: { ...state.state.user, ...user }
          }
        }))
    }
  };
});
