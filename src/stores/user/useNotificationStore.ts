import { NotificationMessage, UserNotification } from '../../../types/index'
import { create } from 'zustand'

type ActionsProps = {
  add: (notification: UserNotification) => void
}

type UserNotificationStore = {
  state: { notification: UserNotification | null }
  actions: ActionsProps
}

export const useNotificationStore = create<UserNotificationStore>()((set) => {
  return {
    state: {
      notification: {
        messages: [] as NotificationMessage[],
        id: '',
        title: '',
        type: '',
        qtd: 0,
        status: '',
        code: 0,
      },
    },
    actions: {
      add: (notification: UserNotification) =>
        set((state) => ({
          ...state,
          state: {
            notification: { ...state.state.notification, ...notification },
          },
        })),
    },
  }
})
