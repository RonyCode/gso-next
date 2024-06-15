import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { create } from 'zustand'

interface ActionsProps {
  add: (unidades: IUnidadeSchema[]) => void
}

interface UnidadeProps {
  state: { unidades: IUnidadeSchema[] }
  actions: ActionsProps
}

export const unidadeStore = create<UnidadeProps>()((set): UnidadeProps => {
  return {
    state: {
      unidades: [],
    },
    actions: {
      add: (unidade): void => {
        set((state) => ({
          state: {
            unidades: [...state.state.unidades, ...unidade],
          },
        }))
      },
    },
  }
})
