'use client'
import { cn } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/ui/separator'
import BreadcrumbGso from '@/components/BreadCrumbGso/BreadcrumbGso'
import Image from 'next/image'
import React from 'react'

type CardProps = {
  title: string
  description: string
  icon: React.ReactNode
  image?: string
  children: React.ReactNode
} & React.ComponentProps<typeof Card>

export function CardDefault({
  title,
  description,
  icon,
  image,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Card
      className={cn(
        '  m-auto min-h-screen w-screen bg-background md:min-h-screen md:w-[80vw] md:p-6',
        className,
      )}
      {...props}
    >
      <CardHeader className="relative mt-0 w-full rounded-[8px] rounded-b-none border border-b-0 border-foreground/60 ">
        <CardTitle className="flex items-center gap-x-2 text-2xl">
          <div className="flex items-center">
            <i>{icon}</i>
            {title}
          </div>
          <div className=" w-5/12 ">
            {image && (
              <Image
                src={image}
                fill
                sizes="100"
                priority={true}
                alt="image banner"
                className=" block "
              />
            )}
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <BreadcrumbGso />
      <Separator />
      <CardContent className="mt-4 grid h-auto w-full rounded-[5px] border-foreground/60 p-0 md:border">
        {children}
      </CardContent>
    </Card>
  )
}
