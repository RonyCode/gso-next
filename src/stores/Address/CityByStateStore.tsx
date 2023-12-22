import { create } from 'zustand'
import { AddressProps } from '../../../types/index'

type ActionsProps = {
  add: (state: AddressProps) => void
}

type CityStore = {
  cities: AddressProps[]
  actions: ActionsProps
}

export const cityStore = create<CityStore>()((set) => {
  return {
    cities: [],

    actions: {
      add: (item) =>
        set((elem) => ({
          cities: [...elem.cities, item],
        })),
    },
  }
})
