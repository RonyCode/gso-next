import { type UserType } from '@/types/index'
import { create } from 'zustand'

interface ActionsProps {
  add: (user: UserType) => void
}

interface UserProps {
  state: { user: UserType }
  actions: ActionsProps
}

export const useUserStore = create<UserProps>()((set): UserProps => {
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
        senha: '',

        account: {
          name: '',
          file: null,
          cpf: '',
          phone: '',
          birthday: '',
          image: '',
        },

        address: {
          address: '',
          number: '',
          zipcode: '',
          complement: '',
          district: '',
          city: '',
          state: '',
          short_name: '',
        },

        profile: {
          role: '',
          dateGranted: '',
          dateExpires: '',
          grantedByIdUser: 0,
        },

        tokenUser: {
          token: '',
          refreshToken: '',
          dateCriation: 0,
          dateExpires: 0,
        },

        userAuth: {
          email: '',
          password: '',
          isUserExternal: 0,
          dateCriation: '',
        },

        excluded: 0,
        id: 0,
      },
    },
    actions: {
      add: (user: UserType): void => {
        set((state) => ({
          state: {
            user: { ...state.state.user, ...user },
          },
        }))
      },
    },
  }
})
