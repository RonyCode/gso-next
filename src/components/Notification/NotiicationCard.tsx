import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { cn } from '@/lib/utils'
import { BellRing, Check } from 'lucide-react'
import { Switch } from '@/ui/switch'
import { Button } from '@/ui/button'
import React from 'react'
import { NotificationMessage } from '../../../types/index'
import Link from 'next/link'
import { DropdownMenuSeparator } from '@/ui/dropdown-menu'
import { useNotificationStore } from '@/stores/user/useNotificationStore'
import { useRouter } from 'next/navigation'

type NotificationProps = {
  notifications: NotificationMessage[] | null | undefined
} & React.ComponentProps<typeof Card>

export const NotificationCard = ({
  notifications,
  className,
  ...props
}: NotificationProps) => {
  const router = useRouter()

  return (
    <>
      <Card className={cn(' w-full md:w-[380px] ', className)} {...props}>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Você tem{' '}
            <strong className="font-extrabold text-foreground ">
              {' '}
              {notifications?.length}
            </strong>{' '}
            notificações novas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid max-h-[calc(100vh_-_15rem)] w-96 overflow-y-scroll ">
          <div className=" flex max-h-[100px] items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Alerta de notificatções
              </p>
              <p className="text-sm text-muted-foreground">
                Aceitar notificações neste dispositivo.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {notifications?.map((notification, indexNoti) => (
              <Link
                key={indexNoti}
                href={`/`}
                target="_blank"
                className="-mx-1 my-1 h-px bg-muted"
                onClick={async () => {
                  useNotificationStore
                    .getState()
                    .state.notification?.messages.forEach((item, index) => {
                      if (index === indexNoti) {
                        if (index > -1) {
                          notifications.splice(index, 1)
                        }
                      }
                    })
                }}
              >
                <div className=" mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification?.id_message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification?.message}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
              </Link>
            ))}
          </div>
        </CardContent>
        {notifications && notifications?.length > 0 && (
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
              <Check className="mr-2 h-4 w-4" /> Marcar todas como lidas
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  )
}
