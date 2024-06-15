import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { create } from 'zustand'

interface ActionsProps {
  add: (organizacao: IOrganizacaoSchema[]) => void
}

interface OrganizacaoProps {
  state: { organizacao: IOrganizacaoSchema[] }
  actions: ActionsProps
}

export const organizacaoStore = create<OrganizacaoProps>()((
  set,
): OrganizacaoProps => {
  return {
    state: {
      organizacao: [],
    },
    actions: {
      add: (organizacao: IOrganizacaoSchema[]): void => {
        set((prevstate) => ({
          state: {
            organizacao: [...prevstate.state.organizacao, ...organizacao],
          },
        }))
      },
    },
  }
})
