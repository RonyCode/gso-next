'use client'
import { getUserNotification } from '@/functions/getNotificationUser'
import { toast } from 'sonner'
import { useNotificationStore } from '@/stores/user/useNotificationStore'
import { UserNotification } from '../../../../../types'
import { Button } from '@/ui/button'
import { LuBell } from 'react-icons/lu'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useSession } from 'next-auth/react'

const NotificationUser = () => {
  const { data: session } = useSession()
  const [state, setState] = useState(false)
  const [count, setcount] = useState(false)

  const handleNotification = async (notification: UserNotification | null) => {
    if (notification?.messages?.length) {
      for (const item of notification?.messages) {
        if (item) {
          toast(item.email, {
            description: item.message,
            action: {
              label: 'Ok',
              onClick: async () =>
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useNotificationStore().actions.add({
                  messages: [],
                  id: '',
                  status: '',
                  title: '',
                  type: '',
                  qtd: 0,
                  code: 0,
                }),
            },

            className: 'mt-12 md:mt-10 -right-6',
          })
        }
      }
    }
    if (notification) {
      setcount(
        useNotificationStore?.getState()?.state?.notification?.id.length > 0,
      )
    }
  }

  setInterval(async () => {
    const res = await getUserNotification(
      'auth',
      'user_logged',
      session?.id_message,
    )
    if (res?.code !== 400) {
      await handleNotification(res)
    }
  }, 60_000)

  const sendNotifications = () => {
    if (
      'Notification' in window &&
      window.Notification.permission === 'granted'
    ) {
      // eslint-disable-next-line no-new
      new Notification('GSO', {
        body: 'asdasd',
        icon: 'images/logo_x72.png',
      })
    }
  }
  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          sendNotifications()
        }
      })
    }
  }, [])

  useEffect(() => {
    if ('Notification' in window) {
      requestNotificationPermission()
    }
  }, [requestNotificationPermission])

  return (
    <>
      <Button
        variant="ghost"
        className={`relative mr-2 h-12 w-12 rounded-full border hover:border-foreground/20 md:block lg:h-14 lg:w-14  ${
          state ? ' hidden' : ' md:flex'
        }  `}
        onClick={() => handleNotification}
      >
        <div className="relative flex w-14 items-center justify-center">
          {count && (
            <div className="absolute -right-1 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-sm text-foreground lg:h-5 lg:w-5">
              {count}{' '}
            </div>
          )}
          <LuBell className="h-8 w-8 lg:h-9 lg:w-9" />
        </div>
      </Button>
    </>
  )
}
export default NotificationUser
