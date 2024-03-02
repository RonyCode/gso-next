'use client'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/ui/button'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { useSession } from 'next-auth/react'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    titleGroup?: string
    group: {
      title: string
      href: string
      icon: ReactNode
    }[]
  }[]
}

export function Sidebar({ className, items }: SidebarNavProps) {
  const pathname = usePathname()
  const session = useSession()
  const nameNavbarSession = session?.data?.name?.split(' ')
  let nameUser: string | null | undefined
  if (nameNavbarSession && nameNavbarSession?.length > 1) {
    nameUser =
      session?.data?.name?.split(' ')?.shift()?.substring(0, 1)?.toUpperCase() +
      ' ' +
      session?.data?.name?.split(' ')?.pop()?.substring(0, 1)?.toUpperCase()
  }
  if (nameNavbarSession && nameNavbarSession?.length === 1) {
    nameUser = session?.data?.name
      ?.split(' ')
      ?.shift()
      ?.substring(0, 1)
      ?.toUpperCase()
  }

  return (
    <div className={cn('pb-12', className)}>
      <div className=" px-3 py-8">
        <div className="relative my-4 ml-auto mr-3 flex h-auto min-h-20 w-[86%] items-center rounded-[8px] border-r-[2px]   border-primary py-2   shadow-[3px_1px_8px_-4px_rgba(0,0,0,0.3)] shadow-foreground">
          <Avatar className="absolute -left-8 z-10 h-24 w-24   shadow shadow-foreground ">
            <AvatarImage
              src={session?.data?.user?.image || '/images/avatar.svg'}
              alt="@shadcn"
              className="object-cover"
            />
            <AvatarFallback className="text-foreground">
              {nameUser}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="ml-20 text-xl font-semibold tracking-tighter text-foreground">
              {session?.data?.name}
            </h1>
            <p className="ml-20  text-muted-foreground">
              {session?.data?.user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          {items.map((item) => (
            <div
              className="w-full items-center justify-start py-4"
              key={item.titleGroup}
            >
              <h2 className="my-2 px-4 text-lg font-semibold tracking-tight">
                {item.titleGroup}
              </h2>
              {item.group.map((itemGroup) => (
                <div className="w-full  justify-start" key={itemGroup.title}>
                  <Button
                    variant="ghost"
                    className=" w-full items-center justify-start"
                  >
                    <Link
                      key={itemGroup.href}
                      href={itemGroup.href}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        pathname === itemGroup.href ? 'w-full  ' : '',
                        ' justify-start gap-2',
                      )}
                    >
                      <span>{itemGroup?.icon}</span>
                      {itemGroup.title}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
