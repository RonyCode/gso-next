import React from 'react'
import { BsBuildingCheck } from 'react-icons/bs'
import { GrGroup } from 'react-icons/gr'
import { LuCalendarDays, LuClock, LuUser } from 'react-icons/lu'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import { RiPoliceCarLine } from 'react-icons/ri'

import { type EventProps } from '../../../types/index'

import { cn } from '@/lib/utils'
import { Badge } from '@/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Label } from '@/ui/label'
import {
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/ui/select'
import { Separator } from '@/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

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
          <div className="m-0 flex justify-evenly p-0 md:justify-between">
            <CardTitle className="flex items-center gap-1">
              <div className="text-md font-bold md:text-xl">
                <Badge
                  className={` block  ${
                    itemEvent.group?.charAt(0).toUpperCase() === 'A'
                      ? 'border-primary text-primary'
                      : itemEvent.group?.charAt(0).toUpperCase() === 'B'
                        ? 'border-blue-500 text-blue-500'
                        : itemEvent.group?.charAt(0).toUpperCase() === 'C'
                          ? 'border-green-600 text-green-600'
                          : itemEvent.group?.charAt(0).toUpperCase() === 'D'
                            ? 'border-yellow-400 text-yellow-400'
                            : itemEvent.group?.charAt(0).toUpperCase() === 'E'
                              ? 'border-[#9400d3] text-[#9400d3]'
                              : ''
                  }`}
                  variant="outline"
                >
                  <span className="p flex items-center gap-1 md:p-1 md:text-[14px]">
                    {' '}
                    <GrGroup />
                    <p>{itemEvent.group}</p>
                  </span>
                </Badge>{' '}
              </div>
            </CardTitle>
            <span className="flex items-center gap-1">
              <i>
                <LuClock size={20} />
              </i>
              <div className="text-md font-bold md:text-xl">
                {' '}
                {itemEvent.start}
              </div>

              <i>
                <LuCalendarDays size={20} />
              </i>
              <div className="text-md font-bold md:text-xl">
                {' '}
                {itemEvent.date}
              </div>
            </span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className=" grid grid-cols-1  md:grid-cols-12 ">
            <div className="col-start-1 col-end-4   row-start-1 row-end-2 ">
              <div className="item-center flex  flex-col justify-center  pb-3 text-sm font-medium">
                <div className=" flex items-center gap-2 rounded-[8px] border  border-primary/60  p-3 md:border-0 md:border-b  ">
                  <div>
                    <Avatar
                      className="
                      flex h-12 w-12  items-center justify-center rounded-full
                      shadow-sm shadow-foreground transition-all duration-300 hover:scale-[200%] "
                    >
                      <AvatarImage
                        className="aspect-square rounded-full object-cover"
                        src={itemEvent.imgUnity}
                      />
                      <AvatarFallback>
                        {<BsBuildingCheck size={36} />}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">Unidade </p>
                  </div>
                  <Select defaultValue="edit">
                    <SelectTrigger className="ml-auto w-[110px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edit">{itemEvent.unity}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid  w-full grid-cols-2 gap-4  p-3">
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center gap-1 ">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Cidade</Label>
                  </div>
                  <p className="text-sm font-medium">{itemEvent.company}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center gap-1 ">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Tipo</Label>
                  </div>
                  <p className="text-sm font-medium">{itemEvent.type}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center gap-1 ">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Status</Label>
                  </div>
                  <p className="text-sm font-medium">{itemEvent.status}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center  gap-1">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Companhia</Label>
                  </div>
                  <p className="text-sm font-medium">{itemEvent.unity}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center  gap-1">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Cidade</Label>
                  </div>
                  <p className="text-sm font-medium">{itemEvent.company}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:col-start-4 md:col-end-13 md:grid-cols-9 ">
              {itemEvent.cars?.map((item, index) => (
                <div
                  key={index}
                  className="col-span-3 border-l border-foreground/10"
                >
                  <div className="flex items-center gap-2 rounded-[8px] border  border-primary/60  p-3 md:border-0 md:border-b  ">
                    <div>
                      <Avatar
                        className="
                      flex h-12 w-12  items-center justify-center rounded-full
                      shadow-sm shadow-foreground transition-all duration-300 hover:scale-[200%] "
                      >
                        <AvatarImage
                          className="aspect-square rounded-full object-cover"
                          src={item.imageCar}
                        />
                        <AvatarFallback>
                          {<RiPoliceCarLine size={36} />}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">VTR </p>
                    </div>
                    <Select defaultValue="edit">
                      <SelectTrigger className="ml-auto w-[110px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">{item.nameCar}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {item.members.map((itemMember, index) => (
                    <div key={index} className="flex items-center gap-2 p-2">
                      <Avatar
                        className="flex h-10 w-10 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all
                        duration-300 hover:scale-[200%] md:h-12 md:w-12"
                      >
                        <AvatarImage
                          className="aspect-square rounded-full object-cover"
                          src={itemMember.imageMember}
                        />
                        <AvatarFallback>{<LuUser size={36} />}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {itemMember.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {itemMember.email}
                        </p>
                      </div>
                      <Select defaultValue="edit">
                        <SelectTrigger className="ml-auto w-[110px]">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="edit">
                            {itemMember.function}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
