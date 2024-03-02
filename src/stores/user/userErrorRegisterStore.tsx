import { UserType } from '../../../types/index'
import { create } from 'zustand'

type UserStore = {
  user: UserType
  add: (user: UserType) => void
}

export const userErrorRegisterStore = create<UserStore>()((set) => {
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
    add: (user: UserType) => set((state) => ({ ...state.user, user })),
  }
})
