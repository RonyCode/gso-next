import { type AddressProps } from '../../../types/index'

import { create } from 'zustand'

interface ActionsProps {
  add: (state: AddressProps) => void
}

interface CityStore {
  cities: AddressProps[]
  actions: ActionsProps
}

export const cityStore = create<CityStore>()((set) => {
  return {
    cities: [],

    actions: {
      add: (item) => {
        set((elem): { cities: AddressProps[] } => ({
          cities: [...elem.cities, item],
        }))
      },
    },
  }
})
