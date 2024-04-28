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
import { Separator } from '@/ui/separator'
import { LucideBookText, LucideCaptions, LucideTextQuote } from 'lucide-react'
import { ModalGso } from '@/components/Modal/ModalGso/ModalGso'

type CardProps = {
  itemEvent: EventProps
  children?: React.ReactNode
  icon?: React.ReactNode
} & React.ComponentProps<typeof Card>

export const CardListEscala = ({
  itemEvent,
  icon,
  className,
  ...props
}: CardProps) => {
  return (
    <>
      <Card className={cn('  mb-3 w-full ', className)} {...props}>
        <CardHeader className="justify-center p-2 md:p-3">
          <CardTitle>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>{icon}</div>
                <div> Equipe - {itemEvent.group.toUpperCase()}</div>
              </div>
              <div className="absolute right-2 top-[50%]">
                <div>
                  {itemEvent.date} - {itemEvent.start}
                </div>
              </div>
            </div>
          </CardTitle>
          <CardDescription className="flex flex-row items-center gap-2">
            <LucideCaptions size={18} />
            {itemEvent.title}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mx-3 grid grid-cols-5 rounded-[8px] px-4 md:mx-4 ">
          <div>{itemEvent.description}</div>
          <div>{itemEvent.unity}</div>
          <div>{itemEvent.status}</div>
          <div>{itemEvent.company}</div>
          <ModalGso nameButton="Membros" className="h-[300px] w-[450px] p-0">
            {itemEvent.members?.map((item, index) => (
              <ul key={index}>
                <li>{item.name}</li>
                <li>{item.function}</li>
                <li>{item.email}</li>
              </ul>
            ))}
          </ModalGso>

          {/* {children} */}
        </CardContent>
      </Card>
    </>
  )
}
