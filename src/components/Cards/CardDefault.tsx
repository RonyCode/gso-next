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
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { Slash } from 'lucide-react'
import { LuArrowBigRight } from 'react-icons/lu'
import { GiBo } from 'react-icons/gi'
import { TbSlashes } from 'react-icons/tb'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const arrayPathname = pathname?.split('/')
  arrayPathname?.shift()
  console.log(arrayPathname)
  return (
    <Card
      className={cn(
        ' m-auto h-screen w-screen bg-background md:min-h-[70vh] md:w-[80vw] md:px-16',
        className,
      )}
      {...props}
    >
      <CardHeader className="w-full">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <i>{icon}</i>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Breadcrumb>
        <BreadcrumbList>
          {arrayPathname?.map((item, index) => {
            const link = item
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item}> {item}</BreadcrumbLink>
                <BreadcrumbSeparator>
                  <Slash size={28} />
                </BreadcrumbSeparator>
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <CardContent className="grid p-0">{children}</CardContent>
    </Card>
  )
}
