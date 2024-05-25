'use client'
import { LuBell } from 'react-icons/lu'

import type { UserNotification } from '../../../types/index'

import { NotificationCard } from '@/components/Notification/NotiicationCard'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'

interface NotificationUserProps {
  notification: UserNotification
}

const NotificationUser = ({
  notification,
}: NotificationUserProps): JSX.Element => {
  // const { data: session } = useSession()

  return (
    <>
      <DropdownMenu>
        {/* <AllowCookie /> */}

        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative mr-2 h-12 w-12  rounded-full border hover:border-foreground/20 md:block md:flex lg:h-14 lg:w-14"
          >
            <div className="relative flex w-14 items-center justify-center ">
              {notification?.messages?.length > 0 && (
                <div className="absolute -right-1 -top-2 flex h-4 w-4 items-center  justify-center rounded-full bg-primary text-sm text-foreground lg:h-5 lg:w-5">
                  {notification?.messages?.length}{' '}
                </div>
              )}
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
              <NotificationCard notifications={notification?.messages} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export default NotificationUser
