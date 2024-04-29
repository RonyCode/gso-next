import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'
import { EventProps } from '../../../types/index'
import { Separator } from '@/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/ui/select'
import { LucideCalendarDays, LucideUser } from 'lucide-react'
import { GrGroup } from 'react-icons/gr'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import { Label } from '@/ui/label'
import { RiPoliceCarLine } from 'react-icons/ri'

type CardProps = {
  itemEvent: EventProps
  children?: React.ReactNode
} & React.ComponentProps<typeof Card>

export const CardListEscala = ({
  itemEvent,
  className,
  ...props
}: CardProps) => {
  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardHeader className="justify-center p-2 md:p-3">
          <div className="flex justify-between">
            <CardTitle className="flex items-center gap-2">
              <i>
                <GrGroup size={20} />
              </i>
              <h4 className="text-xl font-bold">Equipe - {itemEvent.group}</h4>
            </CardTitle>
            <span className="flex items-center gap-2">
              <i>
                <LucideCalendarDays size={20} />
              </i>
              <h4 className="text-xl font-bold">{itemEvent.date}</h4>
            </span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className=" ' grid  grid-cols-1 md:grid-cols-4 ">
            <div className="border border-foreground">
              <div className="flex items-center gap-2 text-sm font-medium">
                <i>
                  <MdOutlineMapsHomeWork />
                </i>
                <Label> Organização</Label>
              </div>
              <p className="text-sm font-medium">{itemEvent.company}</p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <i>
                  <MdOutlineMapsHomeWork />
                </i>
                <Label> Unidade</Label>
              </div>
              <p className="text-sm font-medium">{itemEvent.unity}</p>
            </div>

            <div className="border border-foreground">
              <div className="flex items-center gap-2 text-sm font-medium">
                <i>
                  <MdOutlineMapsHomeWork />
                </i>
                <Label> Organização</Label>
              </div>
              <p className="text-sm font-medium">{itemEvent.company}</p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <i>
                  <MdOutlineMapsHomeWork />
                </i>
                <Label> Unidade</Label>
              </div>
              <p className="text-sm font-medium">{itemEvent.unity}</p>
            </div>

            <div className="border border-foreground">
              <div className="mx-2 flex justify-between">
                <h4 className="text-sm font-medium">Membros</h4>
                <h4 className="text-sm font-medium">Função</h4>
              </div>
              <div className="grid gap-2">
                {itemEvent.members?.map((item, index) => (
                  <div
                    className="flex items-center justify-between space-x-4"
                    key={index}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="flex h-14 w-14  items-center justify-center rounded-full shadow-sm shadow-foreground">
                        <AvatarImage
                          className="aspect-square rounded-full object-cover"
                          src={item.image}
                        />
                        <AvatarFallback>
                          {<LucideUser size={36} />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    <Select defaultValue="edit">
                      <SelectTrigger className="ml-auto w-[110px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">{item.function}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-foreground">
              <div className="mx-2 flex justify-between">
                <h4 className="text-sm font-medium">Viaturas</h4>
                <h4 className="text-sm font-medium">Préfixo</h4>
              </div>
              <div className="grid gap-3">
                {itemEvent.members?.map((item, index) => (
                  <div
                    className="flex items-center justify-between space-x-4"
                    key={index}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="flex h-14 w-14  items-center justify-center rounded-full shadow-sm shadow-foreground">
                        <AvatarImage
                          className="aspect-square rounded-full object-cover"
                          src={item.image}
                        />
                        <AvatarFallback>
                          {<RiPoliceCarLine size={36} />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <Select defaultValue="edit">
                      <SelectTrigger className="ml-auto w-[110px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">{item.function}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
