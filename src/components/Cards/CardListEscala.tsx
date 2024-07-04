import React, { type ReactElement } from 'react'
import { GrGroup } from 'react-icons/gr'
import {
  LuBuilding2,
  LuCalendarCheck,
  LuCalendarDays,
  LuCar,
  LuClipboardCheck,
  LuClock,
  LuGroup,
  LuLocateFixed,
  LuMegaphone,
  LuPhone,
  LuUser,
  LuUserCog2,
  LuUsers,
} from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type FunctionsMembers } from '@/types/index'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Label } from '@/ui/label'
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
                            ? 'border-green-500/85 text-green-500/85'
                            : itemEvent.team === 5
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
                              ? 'DELTA'
                              : itemEvent.team === 5
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
                  {itemEvent?.hour_start
                    .split(':')
                    .slice(0, 2)
                    .join(':')} /{' '}
                  {itemEvent?.hour_finish.split(':').slice(0, 2).join(':')}
                </div>
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="text-sm">
            {unidade?.companySchedules?.map((schedule, index) => (
              <div key={index}>
                {schedule?.schedule?.id === itemEvent?.id && (
                  <div>
                    <div className="grid grid-cols-1 gap-2 overflow-hidden py-4 md:grid-cols-12 ">
                      <div className="col-span-6 flex flex-col justify-around rounded-[5px] border border-primary/60 p-2 ">
                        <div>
                          <div className="mb-2 flex items-center gap-1 border-b border-primary/60 p-2">
                            <LuClipboardCheck />
                            <h1 className="text-md font-bold">Detalhes</h1>
                          </div>
                          <div className=" grid grid-cols-1  gap-y-4  md:grid-cols-2">
                            <div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <LuPhone />
                                Corporação:
                              </div>
                              <span className="ml-6 text-foreground">
                                {unidade?.short_name_corp}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                {' '}
                                <LuBuilding2 />
                                Unidade
                              </div>
                              <span className="ml-6 text-foreground">
                                {' '}
                                {unidade?.name}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <LuLocateFixed />
                                Cidade
                              </div>
                              <span className="ml-6 text-foreground">
                                {unidade?.companyAddress?.city}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                {' '}
                                <LuPhone />
                                Telefone
                              </div>

                              <span className="ml-6 text-foreground">
                                {' '}
                                {unidade?.phone}
                              </span>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {' '}
                                <LuPhone />
                                CMT Unidade
                              </div>
                              <div className="ml-6">
                                {unidade?.companyMembers?.map((member) => (
                                  <span
                                    key={member?.id}
                                    className="text-foreground"
                                  >
                                    {member?.id === unidade?.director &&
                                      member?.competence + ' - ' + member?.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mt-4 flex items-center gap-1">
                            <LuClipboardCheck />
                            <h1 className="text-md font-bold">Observações</h1>
                          </div>
                          <textarea className="mt-1 h-28 w-full p-2 text-justify">
                            {schedule?.schedule?.obs}
                          </textarea>
                        </div>
                      </div>
                      <div className="col-span-6 rounded-[5px] border border-primary/60 p-2 ">
                        <div className="flex items-center gap-2 border-b border-primary/60 p-2">
                          <LuUsers />
                          <h1 className="text-md font-bold">Efetivo</h1>
                        </div>
                        <div className="h-full">
                          {unidade?.companyMembers?.map(
                            (memberUnidade, indexMember) => (
                              <div key={indexMember}>
                                {memberUnidade?.id_function === 9 && (
                                  <div className="mt-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <LuCalendarCheck />
                                      <h1>Escalante</h1>
                                    </div>
                                    <div className="flex items-center justify-between px-2 py-1.5">
                                      <div className="flex items-center">
                                        <Avatar
                                          className="flex h-10 w-10 items-center justify-center  rounded-full
                                          duration-300 hover:scale-[200%]"
                                        >
                                          <AvatarImage
                                            className="aspect-square rounded-full object-cover"
                                            src={
                                              memberUnidade?.image ??
                                              process.env.NEXT_PUBLIC_API_GSO +
                                                '/public/images/img.png'
                                            }
                                          />
                                          <AvatarFallback>
                                            {<LuUser size={36} />}
                                          </AvatarFallback>
                                        </Avatar>

                                        <Button variant="outline">
                                          {<LuUser className="mr-1" />}
                                          {memberUnidade?.competence +
                                            ' ' +
                                            memberUnidade?.name}
                                        </Button>
                                      </div>
                                      <Badge
                                        className="ml-2 hidden md:block"
                                        variant="secondary"
                                      >
                                        {memberUnidade?.short_name_function?.replace(
                                          ' ',
                                          ' / ',
                                        )}
                                      </Badge>
                                    </div>
                                  </div>
                                )}

                                {memberUnidade?.id_schedule?.toString() ===
                                  itemEvent?.id?.toString() &&
                                  memberUnidade?.id_function === 6 && (
                                    <div>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <LuMegaphone />
                                        <h1>Comunicação</h1>
                                      </div>

                                      <div className="flex items-center justify-between px-2 py-1.5">
                                        <div className="flex items-center">
                                          <Avatar
                                            className="flex h-10 w-10 items-center justify-center  rounded-full
                                          duration-300 hover:scale-[200%]"
                                          >
                                            <AvatarImage
                                              className="aspect-square rounded-full object-cover"
                                              src={
                                                memberUnidade?.image ??
                                                process.env
                                                  .NEXT_PUBLIC_API_GSO +
                                                  '/public/images/img.png'
                                              }
                                            />
                                            <AvatarFallback>
                                              {<LuUser size={36} />}
                                            </AvatarFallback>
                                          </Avatar>

                                          <Button variant="outline">
                                            {<LuUser className="mr-1" />}
                                            {memberUnidade?.competence +
                                              ' ' +
                                              memberUnidade?.name}
                                          </Button>
                                        </div>
                                        <Badge
                                          className="ml-2 hidden md:block"
                                          variant="secondary"
                                        >
                                          {memberUnidade?.short_name_function?.replace(
                                            ' ',
                                            ' / ',
                                          )}
                                        </Badge>
                                      </div>
                                    </div>
                                  )}

                                {memberUnidade?.id_schedule?.toString() ===
                                  itemEvent?.id?.toString() &&
                                  memberUnidade?.id_function === 3 && (
                                    <div>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <LuUserCog2 size={18} />
                                        <h1>CMT de Socorro</h1>
                                      </div>

                                      <div className="flex items-center justify-between px-2 py-1.5">
                                        <div className="flex items-center">
                                          <Avatar
                                            className="flex h-10 w-10 items-center justify-center  rounded-full
                                          duration-300 hover:scale-[200%]"
                                          >
                                            <AvatarImage
                                              className="aspect-square rounded-full object-cover"
                                              src={
                                                memberUnidade?.image ??
                                                process.env
                                                  .NEXT_PUBLIC_API_GSO +
                                                  '/public/images/img.png'
                                              }
                                            />
                                            <AvatarFallback>
                                              {<LuUser size={36} />}
                                            </AvatarFallback>
                                          </Avatar>

                                          <Button variant="outline">
                                            {<LuUser className="mr-1" />}
                                            {memberUnidade?.competence +
                                              ' ' +
                                              memberUnidade?.name}
                                          </Button>
                                        </div>
                                        <Badge
                                          className="ml-2 hidden md:block"
                                          variant="secondary"
                                        >
                                          {memberUnidade?.short_name_function?.replace(
                                            ' ',
                                            ' / ',
                                          )}
                                        </Badge>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-md flex items-center  gap-2 py-4 font-bold">
                      <LuCar />
                      <h1>Viaturas</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-2  md:grid-cols-12 ">
                      {schedule?.cars?.map((car, indexCar) => (
                        <div
                          key={indexCar}
                          className={`col-span-6  rounded-[5px] border border-primary/60 p-2 `}
                        >
                          <div className="flex items-center justify-between  border-b border-primary/60 py-1.5">
                            <div className="flex items-center ">
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
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-bold"
                              >
                                {car?.car?.model}
                              </Button>
                              <span className="rounded-[5px] border border-muted-foreground/60 p-1 text-[.6rem] md:text-[.725rem]">
                                {car?.car?.plate}
                              </span>
                            </div>
                            <Button variant="default" size="sm">
                              {car?.car?.prefix}
                            </Button>
                          </div>
                          <div className="mt-2">
                            {car.members.map((member, indexMember) => (
                              <div key={indexMember} className="py-1">
                                <div className="flex w-full items-center justify-between text-sm">
                                  <div className="flex items-center ">
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
                                    <Button variant="outline">
                                      <LuUser className="mr-1" />
                                      {member?.competence + ' ' + member?.name}
                                    </Button>{' '}
                                  </div>

                                  <Badge
                                    className="xl:p-[.5rem ] xl:text-[.650rem]"
                                    variant="secondary"
                                  >
                                    {member?.short_name_function}
                                  </Badge>
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
