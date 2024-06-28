import { getServerSession } from 'next-auth'
import React, { type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { BsBuildingCheck } from 'react-icons/bs'
import { GrGroup } from 'react-icons/gr'
import { LuCalendarDays, LuClock, LuUser } from 'react-icons/lu'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import { RiPoliceCarLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

import { cn } from '@/lib/utils'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/ui/form'
import { Label } from '@/ui/label'
import {
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/ui/select'
import { Separator } from '@/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { z } from 'zod'

type CardProps = {
  itemEvent: IScheduleSchema
  unidade?: IUnidadeSchema
  children?: React.ReactNode
  className?: string
} & React.ComponentProps<typeof Card>

export const CardListEscala = ({
  itemEvent,
  unidade,
  className,
  ...props
}: CardProps): ReactElement => {
  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardHeader className="justify-center p-2 md:p-3">
          <div className="m-0 flex justify-evenly p-0 md:justify-between">
            <CardTitle className="flex w-full items-center justify-between gap-1">
              <div className="text-md font-bold ">
                <Badge
                  className={` block ${
                    itemEvent.team === 1
                      ? 'border-primary/85 text-primary/85'
                      : itemEvent.team === 2
                        ? 'border-blue-500/85 text-blue-500/85'
                        : itemEvent.team === 3
                          ? 'border-yellow-400/85 text-yellow-400/85'
                          : itemEvent.team === 4
                            ? 'border-[#9400d3]/85 text-[#9400d3]/85'
                            : ''
                  }`}
                  variant="outline"
                >
                  <span className="flex items-center gap-1 ">
                    {' '}
                    <GrGroup />
                    <p>
                      {itemEvent.team === 1
                        ? 'ALFA'
                        : itemEvent.team === 2
                          ? 'BRAVO'
                          : itemEvent.team === 3
                            ? 'CHARLIE'
                            : itemEvent.team === 4
                              ? 'EXTRA'
                              : ''}
                    </p>
                  </span>
                </Badge>{' '}
              </div>
              <span className="flex items-center gap-1">
                <i>
                  <LuCalendarDays />
                </i>
                <div className="font-bold text-muted-foreground">
                  {' '}
                  {format(itemEvent?.date_creation, 'eeeeee', {
                    locale: ptBR,
                  }) +
                    '  | ' +
                    format(itemEvent?.date_creation, 'dd/MM', { locale: ptBR })}
                </div>
              </span>
              <span className="flex items-center gap-1">
                <i>
                  <LuClock />
                </i>
                <div className="font-bold text-muted-foreground">
                  {' '}
                  {itemEvent?.hour_start.split(':').slice(0, 2).join(':')}
                </div>
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className=" grid grid-cols-1  md:grid-cols-12 ">
            <div className="col-start-1 col-end-4 ">
              <div className="item-center flex  flex-col justify-center  pb-3 text-sm font-medium">
                <div className=" flex items-center gap-2 rounded-[8px] border  border-primary/60  p-1 md:border-0 md:border-b  ">
                  <div>
                    <Avatar
                      className="
                      flex h-14 w-14  items-center justify-center rounded-full
                      shadow-sm shadow-foreground transition-all duration-300 hover:scale-[200%] "
                    >
                      <AvatarImage
                        className="aspect-square rounded-full object-cover"
                        src={unidade?.image}
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
                      <SelectItem value="edit">{unidade?.name}</SelectItem>
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
                    <Label> id unidade</Label>
                  </div>
                  <p className="text-sm font-medium">{unidade?.id}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center gap-1 ">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Tipo</Label>
                  </div>
                  <p className="text-sm font-medium">{unidade?.type}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center gap-1 ">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> id schedule</Label>
                  </div>
                  <p className="text-sm font-medium">{itemEvent?.id}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center  gap-1">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Companhia</Label>
                  </div>
                  <p className="text-sm font-medium">{unidade?.name}</p>
                </div>
                <div className="item-start flex flex-col justify-center  text-sm font-medium">
                  <div className="flex  items-center  gap-1">
                    <i>
                      <MdOutlineMapsHomeWork />
                    </i>
                    <Label> Cidade</Label>
                  </div>
                  <p className="text-sm font-medium">
                    {unidade?.companyAddress?.city}
                  </p>
                </div>
              </div>
            </div>
            {unidade?.companySchedules?.map((itemSchedule, index) => (
              <div key={index} className="col-start-4 col-end-13">
                {itemSchedule?.schedule.id === itemEvent?.id && (
                  <div className="col-span-3">
                    {itemSchedule?.cars?.map((carSchedule, inderxCa) => (
                      <div
                        key={inderxCa}
                        className=" col-start-1 col-end-9  flex w-full items-center justify-between gap-2 rounded-[8px] border  border-primary/60  p-1 md:border-0 md:border-b "
                      >
                        <Avatar
                          className="
                                flex h-14 w-14  items-center justify-center rounded-full
                                shadow-sm shadow-foreground transition-all duration-300 hover:scale-[200%] "
                        >
                          <AvatarImage
                            className="aspect-square rounded-full object-cover"
                            src={carSchedule?.car?.image}
                          />
                          <AvatarFallback>
                            {<RiPoliceCarLine size={36} />}
                          </AvatarFallback>
                        </Avatar>
                        {/* <div> */}
                        {/*  <p className="text-sm font-medium leading-none"> */}
                        {/*    {carSchedule?.car?.prefix}{' '} */}
                        {/*  </p> */}
                        {/* </div> */}
                        {/* <Select defaultValue="edit"> */}
                        {/*  <SelectTrigger className="ml-auto w-[110px]"> */}
                        {/*    <SelectValue placeholder="Selecione" /> */}
                        {/*  </SelectTrigger> */}
                        {/*  <SelectContent> */}
                        {/*    <SelectItem value="edit"> */}
                        {/*      {carSchedule?.car?.plate} */}
                        {/*    </SelectItem> */}
                        {/*  </SelectContent> */}
                        {/* </Select> */}

                        {/* {carSchedule?.members?.map( */}
                        {/*  (carMembers, indexMember) => ( */}
                        {/*    <div */}
                        {/*      key={indexMember} */}
                        {/*      className="flex items-center justify-center gap-1" */}
                        {/*    > */}
                        {/*      {carMembers?.name} */}
                        {/*      <Avatar */}
                        {/*        className="flex h-8 w-8 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all */}
                        {/*          duration-300 hover:scale-[200%] md:h-10 md:w-10" */}
                        {/*      > */}
                        {/*        <AvatarImage */}
                        {/*          className="aspect-square rounded-full object-cover" */}
                        {/*          src={ */}
                        {/*            carMembers?.image ?? */}
                        {/*            process.env.NEXT_PUBLIC_API_GSO + */}
                        {/*              '/public/images/img.png' */}
                        {/*          } */}
                        {/*        /> */}
                        {/*        <AvatarFallback> */}
                        {/*          {<LuUser size={36} />} */}
                        {/*        </AvatarFallback> */}
                        {/*      </Avatar> */}
                        {/*      <div> */}
                        {/*        <p className="text-sm font-medium leading-none"> */}
                        {/*          {carMembers?.name} */}
                        {/*        </p> */}
                        {/*        <p className="text-sm text-muted-foreground"> */}
                        {/*          {carMembers?.email} */}
                        {/*        </p> */}
                        {/*      </div> */}
                        {/*      <Select defaultValue="edit"> */}
                        {/*        <SelectTrigger className="ml-auto w-[110px]"> */}
                        {/*          <SelectValue placeholder="Selecione" /> */}
                        {/*        </SelectTrigger> */}
                        {/*        <SelectContent> */}
                        {/*          <SelectItem value="edit"> */}
                        {/*            {carMembers?.id_function} */}
                        {/*          </SelectItem> */}
                        {/*        </SelectContent> */}
                        {/*      </Select> */}
                        {/*    </div> */}
                        {/*  ), */}
                        {/* )} */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
