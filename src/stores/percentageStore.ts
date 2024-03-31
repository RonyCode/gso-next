import { create } from 'zustand'

type ActionsProps = {
  add: (percentage: number) => void
}

type UserProps = {
  state: { percentage: number }
  actions: ActionsProps
}

export const execPercentageStore = create<UserProps>()((set) => {
  return {
    state: {
      percentage: 0,
    },
    actions: {
      add: (percentage: number) =>
        set((state) => ({
          state: {
            percentage: (state.state.percentage = percentage),
          },
        })),
    },
  }
})
