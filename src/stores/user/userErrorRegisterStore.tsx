import { type UserType } from '@/types/index'
import { create } from 'zustand'

interface UserStore {
  user: UserType
  add: (user: UserType) => void
}

export const userErrorRegisterStore = create<UserStore>()((set): UserStore => {
  return {
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
        zipCode: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        sigla: '',
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
      id: '',
    },
    add: (user: UserType): void => {
      set((state) => ({ ...state.user, user }))
    },
  }
})
