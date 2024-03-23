'use client'
import { useNotificationStore } from '@/stores/user/useNotificationStore'
// import { UserNotification } from '../../../../../types'
import { Button } from '@/ui/button'
import { LuBell } from 'react-icons/lu'
// import React, { useEffect, useState } from 'react'
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

  getUserNotification('auth', 'user_logged', session?.id_message)

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
      console.log(JSON.stringify(subscription))
    })

  return (
    <>
      <DropdownMenu>
        <AllowCookie />

        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative mr-2 h-12 w-12  rounded-full border hover:border-foreground/20 md:block md:flex lg:h-14 lg:w-14"
          >
            <div className="relative flex w-14 items-center justify-center ">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                useNotificationStore?.getState()?.state?.notification?.messages
                  ?.length > 0 && (
                  <div className="absolute -right-1 -top-2 flex h-4 w-4 items-center  justify-center rounded-full bg-primary text-sm text-foreground lg:h-5 lg:w-5">
                    {
                      useNotificationStore.getState()?.state?.notification
                        ?.messages?.length
                    }{' '}
                  </div>
                )
              }
              <LuBell className=" h-8 w-8 lg:h-9 lg:w-9" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full md:w-96"
          align="center"
          forceMount
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="h-full">
              <NotificationCard
                notifications={
                  useNotificationStore.getState()?.state?.notification?.messages
                }
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export default NotificationUser
