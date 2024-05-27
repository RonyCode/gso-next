import { type AddressProps } from '../../../types/index'

import { create } from 'zustand'

interface ActionsProps {
  add: (state: AddressProps) => void
}

interface StateStore {
  states: AddressProps[]
  actions: ActionsProps
}

export const stateStore = create<StateStore>()((set) => {
  return {
    states: [],

    actions: {
      add: (item) => {
        set((elem): { states: AddressProps[] } => ({
          states: [...elem.states, item],
        }))
      },
    },
  }
})
