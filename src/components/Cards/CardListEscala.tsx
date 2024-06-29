import React, { type ReactElement } from 'react'
import { BsBuildingCheck } from 'react-icons/bs'
import { GrGroup } from 'react-icons/gr'
import { LuCalendarDays, LuClock } from 'react-icons/lu'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import { RiPoliceCarLine } from 'react-icons/ri'

import { cn } from '@/lib/utils'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
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
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { scheduler } from 'node:timers/promises'

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
  unidade?.companySchedules?.map((schedule, index) => {
    if (schedule?.schedule?.id === itemEvent?.id) {
      console.log(schedule?.schedule.cars)
    }
  })

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
          {unidade?.companySchedules?.map((schedule, index) => (
            <div key={index}>
              {schedule?.schedule?.id === itemEvent?.id && (
                <div>
                  <div>Comunicação</div>

                  <div className="grid grid-cols-12">
                    {schedule?.cars?.map((car, indexCar) => (
                      <div key={indexCar} className="col-span-3">
                        {car?.car?.prefix}
                        {car.members.map((member, indexMember) => (
                          <div key={indexMember}>{member?.name}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
