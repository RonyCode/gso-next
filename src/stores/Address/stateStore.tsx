import { create } from 'zustand'
import { AddressProps } from '../../../types/index'

type ActionsProps = {
  add: (state: AddressProps) => void
}

type StateStore = {
  states: AddressProps[]
  actions: ActionsProps
}

export const stateStore = create<StateStore>()((set) => {
  return {
    states: [],

    actions: {
      add: (item) =>
        set((elem) => ({
          states: [...elem.states, item],
        })),
    },
  }
})
