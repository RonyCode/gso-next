import { create } from 'zustand'

interface ActionsProps {
  add: (percentage: number) => void
}

interface UserProps {
  state: { percentage: number }
  actions: ActionsProps
}

export const execPercentageStore = create<UserProps>()((set) => {
  return {
    state: {
      percentage: 0,
    },
    actions: {
      add: (percentage: number) => {
        set((state): { state: { percentage: number } } => ({
          state: {
            percentage: (state.state.percentage = percentage),
          },
        }))
      },
    },
  }
})
