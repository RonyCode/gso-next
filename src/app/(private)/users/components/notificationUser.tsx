'use client'
import { useNotificationStore } from '@/stores/user/useNotificationStore'
import { UserNotification } from '../../../../../types'
import { Button } from '@/ui/button'
import { LuBell } from 'react-icons/lu'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { getUserNotification } from '@/functions/getNotificationUser'
import { NotificationCard } from '@/components/Notification/NotiicationCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { AllowCookie } from '@/components/AllowCookies/AllowCookie'

const NotificationUser = () => {
  const { data: session } = useSession()
  const [notiication, setNotiication] = useState({} as UserNotification)
  const [showHaveNotification, setShowHaveNotification] = useState(false)

  navigator.serviceWorker
    .register('/service-worker/index.js')
    .then(async (serviceWorker) => {
      let subscription = await serviceWorker.pushManager.getSubscription()
      if (!subscription) {
        const publicKey = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_URL}/api/notification/public-key`,
        )

        const { data } = await publicKey.json()
        subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: data,
        })
      }
      const res = await getUserNotification(
        'auth',
        'user_logged',
        session?.id_message,
      )
      if (res?.code !== 400) {
        setShowHaveNotification(true)
        await handleNotification(res)
      }
      console.log(JSON.stringify(subscription))
    })

  const handleNotification = async (notification: UserNotification | null) => {
    console.log('teste')
    // setShow((prevState) => (prevState = !show))
    if (notification?.messages?.length) {
      for (const item of notification?.messages) {
        if (item) {
          //   toast(item.email, {
          //     description: item.message,
          //     action: {
          //       label: 'Ok',
          //       onClick: async () => {
          //         // eslint-disable-next-line react-hooks/rules-of-hooks
          //         useNotificationStore.getState().actions.add({
          //           messages: [],
          //           id: '',
          //           status: '',
          //           title: '',
          //           type: '',
          //           qtd: 0,
          //           code: 0,
          //         })
          //         setNotiication({
          //           messages: [],
          //           id: '',
          //           status: '',
          //           title: '',
          //           type: '',
          //           qtd: 0,
          //           code: 0,
          //         })
          //       },
          //     },
          //     onDismiss: async () => {
          //       // eslint-disable-next-line react-hooks/rules-of-hooks
          //       useNotificationStore.getState().actions.add({
          //         messages: [],
          //         id: '',
          //         status: '',
          //         title: '',
          //         type: '',
          //         qtd: 0,
          //         code: 0,
          //       })
          //       setNotiication({
          //         messages: [],
          //         id: '',
          //         status: '',
          //         title: '',
          //         type: '',
          //         qtd: 0,
          //         code: 0,
          //       })
          //     },
          //     className: 'mt-12 md:mt-10 -right-6',
          //     onAutoClose: async () => {
          //       // eslint-disable-next-line react-hooks/rules-of-hooks
          //       useNotificationStore.getState().actions.add({
          //         messages: [],
          //         id: '',
          //         status: '',
          //         title: '',
          //         type: '',
          //         qtd: 0,
          //         code: 0,
          //       })
          //       setNotiication({
          //         messages: [],
          //         id: '',
          //         status: '',
          //         title: '',
          //         type: '',
          //         qtd: 0,
          //         code: 0,
          //       })
          //     },
          //   })
          // }
        }
      }
    }
    if (notification) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setNotiication(useNotificationStore.getState()?.state?.notification)
    }
  }

  // setInterval(async () => {
  //   const res = await getUserNotification(
  //     'auth',
  //     'user_logged',
  //     session?.id_message,
  //   )
  //   if (res?.code !== 400) {
  //     await handleNotification(res)
  //   }
  // }, 20000)

  return (
    <>
      <DropdownMenu>
        <AllowCookie />

        <DropdownMenuTrigger asChild>
          {/* <Button */}
          {/*  variant="ghost" */}
          {/*  className="relative h-12 w-12 rounded-full border hover:border-foreground/20 lg:h-14 lg:w-14 " */}
          {/* > */}
          {/*  */}
          {/* </Button> */}

          <Button
            variant="ghost"
            className="relative mr-2 h-12 w-12 rounded-full border hover:border-foreground/20 md:block md:flex lg:h-14 lg:w-14"
          >
            <div className="relative flex w-14 items-center justify-center">
              {notiication?.messages?.length > 0 && (
                <div className="absolute -right-1 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-sm text-foreground lg:h-5 lg:w-5">
                  {notiication?.messages?.length}{' '}
                </div>
              )}
              <LuBell className=" h-8 w-8 lg:h-9 lg:w-9" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96" align="center" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem className="h-full">
              <NotificationCard notifications={notiication.messages} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export default NotificationUser
