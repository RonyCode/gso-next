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
import NavbarCommon from '@/components/navbar-common/NavbarCommon'

type CardProps = {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
} & React.ComponentProps<typeof Card>

export function CardDefault({
  title,
  description,
  icon,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Card
      className={cn(
        ' m-auto h-screen w-screen bg-background md:min-h-[70vh] md:w-[80vw] md:px-16',
        className,
      )}
      {...props}
    >
      <CardHeader className="w-full">
        <NavbarCommon />

        <CardTitle className="flex items-center gap-2 text-2xl">
          <i>{icon}</i>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <BreadcrumbGso />
      <Separator />
      <CardContent className="grid p-0">{children}</CardContent>
    </Card>
  )
}
