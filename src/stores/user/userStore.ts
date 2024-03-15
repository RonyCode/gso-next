import { UserType } from '../../../types/index'
import { create } from 'zustand'

type ActionsProps = {
  add: (user: UserType) => void
}

type UserProps = {
  state: { user: UserType }
  actions: ActionsProps
}

export const useUserStore = create<UserProps>()((set) => {
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
          cpf: '',
          phone: '',
          birthday: '',
          image: '',
        },
        address: {
          address: '',
          number: '',
          zipCode: '',
          complement: '',
          district: '',
          city: '',
          state: '',
          shortName: '',
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
      add: (user: UserType) =>
        set((state) => ({
          state: {
            user: { ...state.state.user, ...user },
          },
        })),
    },
  }
})
