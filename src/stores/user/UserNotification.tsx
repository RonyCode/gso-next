import { UserNotification } from '../../../types/index'
import { create } from 'zustand'

type ActionsProps = {
  add: (notification: UserNotification) => void
}

type UserNotificationStore = {
  state: { notification: UserNotification }
  actions: ActionsProps
}

export const useNotificationStore = create<UserNotificationStore>()((set) => {
  return {
    state: {
      notification: {
        messages: [],
        id: '',
        title: '',
        message: '',
        count: 0,
        code: 0,
        type: '',
        status: '',
        qtd: 0,
      },
    },
    actions: {
      add: (notification: UserNotification) =>
        set((state) => ({
          state: {
            notification: { ...state.state.notification, ...notification },
          },
        })),
    },
  }
})
