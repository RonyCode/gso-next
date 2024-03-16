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

type CardProps = React.ComponentProps<typeof Card>

export const CardsBanner = ({ className, ...props }: CardProps) => {
  const notifications = [
    {
      title: 'Your call has been confirmed.',
      description: '1 hour ago',
    },
    {
      title: 'You have a new message!',
      description: '1 hour ago',
    },
    {
      title: 'Your subscription is expiring soon!',
      description: '2 hours ago',
    },
  ]
  return (
    <>
      <Card className={cn(' w-full md:w-[380px]', className)} {...props}>
        <CardHeader>
          <CardTitle>Notiicações</CardTitle>
          <CardDescription>
            Você tem {notifications.length} notificações novas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
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
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Marcar todas como lidas
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
