import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'
import { EventProps } from '../../../types/index'

type CardProps = {
  itemEvent: EventProps
  link?: string
  children?: React.ReactNode
  icon?: React.ReactNode
} & React.ComponentProps<typeof Card>

export const CardListEscala = ({
  itemEvent,
  icon,
  link,
  className,
  ...props
}: CardProps) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <Card className={cn(' mb-4 w-full ', className)} {...props}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <div>{icon}</div>
                  <div> Equipe - {itemEvent.title.toUpperCase()}</div>
                </div>
                <div>{itemEvent.date}</div>
              </CardTitle>
              <CardDescription>{itemEvent.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <ul>
                  <li>{itemEvent.status}</li>
                  <li>{itemEvent.company}</li>
                  <li>{itemEvent.start}</li>
                </ul>
              </div>

              {/* {children} */}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
      ) : (
        <Card className={cn(' w-full ', className)} {...props}>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <div>{icon}</div>
                <div> {itemEvent.title}</div>
              </div>
            </CardTitle>
            <CardDescription>{itemEvent.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <ul>
                <li>{itemEvent.status}</li>
                <li>{itemEvent.company}</li>
                <li>{itemEvent.start}</li>
              </ul>
            </div>

            {/* {children} */}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      )}
    </>
  )
}
