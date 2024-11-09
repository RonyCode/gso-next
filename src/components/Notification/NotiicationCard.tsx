import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { type ReactElement } from 'react'
import { LuBell, LuBellRing, LuCheck } from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { useNotificationStore } from '@/stores/user/useNotificationStore'
import { Button } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Switch } from '@/ui/switch'
import { setCookie } from 'cookies-next'

type NotificationProps = {
  className?: string
} & React.ComponentProps<typeof Card>

export const NotificationCard = ({
  className,
  ...props
}: NotificationProps): ReactElement => {
  const router = useRouter()
  return (
    <>
      <DropdownMenu>
        {/* <AllowCookie /> */}

        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative mr-2 h-10 w-10  rounded-full border hover:border-foreground/20  md:flex lg:h-12 lg:w-12"
          >
            <div className="relative flex w-14 items-center justify-center ">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                useNotificationStore.getState()?.state?.notification?.messages
                  ?.length > 0 && (
                  <div className="absolute -right-1 -top-2 flex h-4 w-4 items-center  justify-center rounded-full bg-primary text-sm text-foreground lg:h-5 lg:w-5">
                    {
                      useNotificationStore.getState().state.notification
                        ?.messages?.length
                    }
                  </div>
                )
              }
              <LuBell size={24} />
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
              <Card
                className={cn(' w-full md:w-[380px] ', className)}
                {...props}
              >
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Você tem{' '}
                    <strong className="font-extrabold text-foreground ">
                      {' '}
                      {
                        useNotificationStore.getState().state.notification
                          ?.messages?.length
                      }
                    </strong>{' '}
                    notificações novas
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid max-h-[calc(100vh_-_15rem)] w-96 overflow-y-scroll ">
                  <div className=" flex max-h-[100px] items-center space-x-4 rounded-md border p-4">
                    <LuBellRing />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Alerta de notificatções
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Aceitar notificações neste dispositivo.
                      </p>
                    </div>
                    <Switch
                      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                      onClick={async () => {
                        await Notification.requestPermission()
                      }}
                      checked={Notification.permission === 'granted'}
                    />
                  </div>
                  <div>
                    {useNotificationStore
                      .getState()
                      .state?.notification?.messages?.map(
                        (notification, indexNoti) => (
                          <Link
                            passHref
                            key={indexNoti}
                            href={notification?.url}
                            className="-mx-1 my-1 h-px bg-muted "
                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                            onClick={async () => {
                              useNotificationStore
                                .getState()
                                .state.notification?.messages.forEach(
                                  (item, index) => {
                                    if (index === indexNoti) {
                                      if (index > -1) {
                                        useNotificationStore
                                          .getState()
                                          .state?.notification?.messages.splice(
                                            index,
                                            1,
                                          )
                                      }
                                    }
                                    console.log(notification)
                                  },
                                )
                            }}
                          >
                            <div className=" animate trasnsition group  grid grid-cols-[25px_1fr] items-center justify-center rounded-2xl  p-4  duration-300 last:mb-0 last:pb-0 hover:bg-background/90">
                              <span className="flex h-2 w-2  rounded-full bg-primary  group-hover:bg-foreground" />
                              <div>
                                <p className="mb-2 text-sm font-medium leading-none">
                                  {notification?.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {notification?.message}
                                </p>
                              </div>
                            </div>
                            <DropdownMenuSeparator />
                          </Link>
                        ),
                      )}
                  </div>
                </CardContent>

                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  useNotificationStore?.getState()?.state?.notification
                    ?.messages.length > 0 && (
                    <CardFooter>
                      <Button
                        onClick={() => {
                          useNotificationStore.getState().actions.add({
                            messages: [],
                            id: '',
                            status: '',
                            title: '',
                            type: '',
                            qtd: 0,
                            code: 0,
                          })
                          router.refresh()
                        }}
                        className="w-full"
                      >
                        <LuCheck className="mr-2 h-4 w-4" /> Marcar todas como
                        lidas
                      </Button>
                    </CardFooter>
                  )
                }
              </Card>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
