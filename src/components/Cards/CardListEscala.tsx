import React, { type ReactElement } from 'react'
import { GrGroup } from 'react-icons/gr'
import {
  LuCalendarDays,
  LuCar,
  LuClipboardCheck,
  LuClock,
  LuPhone,
  LuUser,
} from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type FunctionsMembers } from '@/types/index'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Input } from '@/ui/input'
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
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

type CardProps = {
  itemEvent: IScheduleSchema
  unidade?: IUnidadeSchema
  functions?: FunctionsMembers[]
  children?: React.ReactNode
  className?: string
} & React.ComponentProps<typeof Card>

export const CardListEscala = ({
  itemEvent,
  unidade,
  functions,
  className,
  ...props
}: CardProps): ReactElement => {
  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardHeader className="justify-center p-2 md:p-3">
          <div className="m-0 flex justify-evenly p-0 md:justify-between">
            <CardTitle className="flex w-full items-center justify-between gap-1">
              <div className="text-md font-bold">
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
          <div>
            <div className="flex items-center gap-2  py-4 text-lg font-bold">
              <LuClipboardCheck />
              <h1>Detalhes</h1>
            </div>
            {unidade?.companySchedules?.map((schedule, index) => (
              <div key={index}>
                {schedule?.schedule?.id === itemEvent?.id && (
                  <div>
                    <div className="grid grid-cols-1 gap-2 text-foreground/60 md:grid-cols-12">
                      <div className="col-span-4 border border-green-50">
                        <Label className="text-lg font-bold">Criado por</Label>
                        <Select>
                          <SelectTrigger className="w-full text-lg font-bold">
                            <SelectValue
                              placeholder={
                                unidade?.companyMembers?.find(
                                  (member) =>
                                    member?.id?.toString() ===
                                    schedule?.schedule?.id_member_creator?.toString(),
                                )?.name
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value={schedule?.schedule?.id_member_creator}
                            >
                              {
                                unidade?.companyMembers?.find(
                                  (member) =>
                                    member?.id?.toString() ===
                                    schedule?.schedule?.id_member_creator?.toString(),
                                )?.name
                              }
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4 border border-green-50">
                        {unidade?.companyMembers?.map(
                          (memberUnidade, indexMember) => (
                            <div key={indexMember}>
                              {memberUnidade?.id_schedule?.toString() ===
                                itemEvent?.id?.toString() &&
                                memberUnidade?.id_function === 5 && (
                                  <div className="py-4">
                                    <div className="flex items-center gap-2">
                                      <LuPhone />
                                      <h1 className="pb-2 text-lg font-bold">
                                        Comunicação
                                      </h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <LuUser />
                                      <span>
                                        {memberUnidade?.competence +
                                          ' ' +
                                          memberUnidade?.name}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-2  py-4 text-lg font-bold">
                      <LuCar />
                      <h1>Viaturas</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-foreground/60 md:grid-cols-12">
                      {schedule?.cars?.map((car, indexCar) => (
                        <div
                          key={indexCar}
                          className={`col-span-6  rounded-[5px] border border-primary/60 p-2`}
                        >
                          <div className="flex items-center justify-between  border-b border-primary/60 p-2">
                            <Avatar
                              className="flex h-12 w-12 items-center justify-center  rounded-full
                                          duration-300 hover:scale-[200%]"
                            >
                              <AvatarImage
                                className="aspect-square rounded-full object-cover"
                                src={car?.car?.image}
                              />
                              <AvatarFallback>
                                {<LuCar size={36} />}
                              </AvatarFallback>
                            </Avatar>

                            <Button size="sm" variant="outline">
                              {car?.car?.prefix}
                            </Button>
                          </div>
                          <div className="mt-2">
                            {car.members.map((member, indexMember) => (
                              <div key={indexMember} className="py-1">
                                <div className="flex w-full items-center justify-between text-sm">
                                  <div className="flex items-center gap-1">
                                    <Avatar
                                      className="flex  w-10 items-center justify-center  rounded-full
                                          duration-300 hover:scale-[200%]"
                                    >
                                      <AvatarImage
                                        className="aspect-square rounded-full object-cover"
                                        src={
                                          member?.image ??
                                          process.env.NEXT_PUBLIC_API_GSO +
                                            '/public/images/img.png'
                                        }
                                      />
                                      <AvatarFallback>
                                        {<LuUser size={36} />}
                                      </AvatarFallback>
                                    </Avatar>
                                    <Button size="sm" variant="outline">
                                      <LuUser className="mr-1" />
                                      {member?.competence + ' ' + member?.name}
                                    </Button>{' '}
                                  </div>
                                  <div>
                                    {functions?.map((func, indexFuncs) => (
                                      <div key={indexFuncs}>
                                        {func?.id !== null &&
                                          func?.id === member?.id_function && (
                                            <Badge className="p-[.5rem ] text-[.650rem]">
                                              {func?.short_name}
                                            </Badge>
                                          )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
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
