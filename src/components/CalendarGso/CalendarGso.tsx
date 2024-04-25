'use client'

import { EscalaProps, EventProps } from '../../../types/index'
import { LucideArrowBigLeft, LucideArrowBigRight } from 'lucide-react'
import { Button } from '@/ui/button'
import { useState } from 'react'
import { Badge } from '@/ui/badge'
import { DataTableEscala } from '@/components/DataTables/DataTableEscala/data-table-escala'
import { columnsEscala } from '@/components/DataTables/DataTableEscala/columnsEscala'

export const data = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'b@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'd@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com',
  },

  // ...
]

const CalendarGso = ({ event }: { event: EventProps[] }) => {
  const date = new Date()
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [dayWeek, setDayWeek] = useState(date.getDay())

  const monthName = [
    { monthName: 'Janeiro', number: 0 },
    { monthName: 'Fevereiro', number: 1 },
    { monthName: 'Março', number: 2 },
    { monthName: 'Abril', number: 3 },
    { monthName: 'Maio', number: 4 },
    { monthName: 'Junho', number: 5 },
    { monthName: 'Julho', number: 6 },
    { monthName: 'Agosto', number: 7 },
    { monthName: 'Setembro', number: 8 },
    { monthName: 'Outubro', number: 9 },
    { monthName: 'Novembro', number: 10 },
    { monthName: 'Dezembro', number: 11 },
  ]

  const diasSemana = [
    // { nameDay: 'Domingo', shortNameDay: 'Dom' },
    { nameDay: 'Segunda', shortNameDay: 'Seg' },
    { nameDay: 'Terça', shortNameDay: 'Ter' },
    { nameDay: 'Quarta', shortNameDay: 'Qua' },
    { nameDay: 'Quinta', shortNameDay: 'Qui' },
    { nameDay: 'Sexta', shortNameDay: 'Sex' },
    { nameDay: 'Sábado', shortNameDay: 'Sáb' },
  ]
  const escalaObj = [
    {
      day: 0,
      dayWeek: 0,
      dayShortName: '',
      year,
      month,
      dayName: '',
      dayEvent: [] as EventProps[],
    },
  ]
  const handleCountDaysInMonth = (numberMonth: number) => {
    const lastDigiteYear = year.toString().slice(-2)

    if (numberMonth === -1) numberMonth = 11
    // Dias do mês com ano bissexto
    if (numberMonth === 1) {
      if (year % 4 === 0 && lastDigiteYear !== '00') {
        return 29
      } else {
        return 28
      }
    }

    // Dias dos mês com 30 dias
    if (
      numberMonth === 3 ||
      numberMonth === 5 ||
      numberMonth === 8 ||
      numberMonth === 10
    ) {
      return 30
    }
    if (
      numberMonth === 0 ||
      numberMonth === 2 ||
      numberMonth === 4 ||
      numberMonth === 6 ||
      numberMonth === 7 ||
      numberMonth === 9 ||
      numberMonth === 11
    ) {
      return 31
    }
  }

  const daysInMonth = handleCountDaysInMonth(month)

  const handleEventDay = (
    day: number,
    month: number,
    year: number,
    event: EventProps[],
  ) => {
    return event.filter((itemEvento) => {
      return (
        itemEvento.day === day &&
        itemEvento.month === month &&
        itemEvento.year === year
      )
    })
  }

  const daysCalculate =
    dayWeek === date.getDay() ? daysInMonth : daysInMonth! + Math.abs(dayWeek)
  for (let i = 0; i <= daysCalculate!; i++) {
    if (i % 7) {
      escalaObj.push({
        day: dayWeek === date.getDay() ? i : dayWeek + i,
        dayWeek: i % 7,
        dayShortName:
          i % 7 === 1
            ? 'Seg'
            : i % 7 === 2
              ? 'Ter'
              : i % 7 === 3
                ? 'Qua'
                : i % 7 === 4
                  ? 'Qui'
                  : i % 7 === 5
                    ? 'Sex'
                    : i % 7 === 6
                      ? 'Sab'
                      : '',
        dayName:
          i % 7 === 1
            ? 'Segunda'
            : i % 7 === 2
              ? 'Terça'
              : i % 7 === 3
                ? 'Quarta'
                : i % 7 === 4
                  ? 'Quinta'
                  : i % 7 === 5
                    ? 'Sexta'
                    : i % 7 === 6
                      ? 'Sábado'
                      : '',
        dayEvent: handleEventDay(i, month, year, event),
        year,
        month,
      })
    } else {
      escalaObj.push({
        day: dayWeek === date.getDay() ? i : i + dayWeek,
        dayWeek: 0,
        dayShortName: 'Dom',
        dayName: 'Domingo',
        dayEvent: handleEventDay(i, month, year, event),
        year,
        month,
      })
    }
  }
  escalaObj.shift()
  const handlePrevious = () => {
    const lastDayWeek = escalaObj[escalaObj.length - 1].dayWeek
    const monthChanged = handleCountDaysInMonth(month - 1)
    const diffDayInMounts = daysInMonth! - monthChanged!
    const newDayWeek = Math.abs(diffDayInMounts) + lastDayWeek
    setDayWeek(newDayWeek * -1 - 1)
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }
  const handleNext = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setDayWeek(escalaObj[escalaObj.length - 1].dayWeek * -1)
  }

  const handleOpenModal = (event: EscalaProps) => {
    console.log(event)
  }
  const eventsList: EventProps[] = []
  escalaObj.forEach((item) => {
    item.dayEvent.forEach((event) => {
      eventsList.push(event)
    })
  })

  return (
    <>
      <div className="mt-12 grid h-[80vh] w-full grid-cols-12  md:mt-0 ">
        <div
          className={`col-start-1  col-end-13  mt-12 h-[80vh] w-full rounded-[5px] bg-background p-2 md:col-end-7 md:mt-0`}
        >
          <div>
            {/* <DataTableEscala columnsEscala={columnsEscala} data={eventsList} /> */}
            <DataTableEscala data={eventsList as []} columns={columnsEscala} />
          </div>
        </div>

        <div
          className={`col-start-1 col-end-13 row-start-1 row-end-2  w-full place-content-center rounded-[5px] px-2 md:col-start-7 md:row-start-1`}
        >
          <div className="border-b-none flex justify-between border border-foreground/10 p-2">
            <Button variant="default" onClick={handlePrevious}>
              <span className="hidden   md:block">Anterior</span>
              <span>
                <LucideArrowBigLeft className="md:hidden" />
              </span>
            </Button>
            <span className="text-lg font-bold">
              {monthName[month]?.monthName} / {year}
            </span>
            <div>
              <Button variant="default" onClick={handleNext}>
                <span className="hidden md:block">Próximo</span>
                <span>
                  <LucideArrowBigRight className="md:hidden" />
                </span>
              </Button>
            </div>
          </div>

          <div
            className="
            grid h-10 w-full  grid-cols-7 rounded-[3px]"
          >
            {diasSemana.map((day, index) => (
              <div
                key={index}
                className="  w-full cursor-pointer flex-col
                items-center justify-center rounded-[3px]
                border border-foreground/10 hover:border
                hover:border-primary/60  md:flex lg:h-full"
              >
                <span className="hidden sm:block md:block lg:block xl:block">
                  {day.nameDay}
                </span>
                <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                  {day.shortNameDay}
                </span>
              </div>
            ))}
          </div>

          <div
            className="
            grid h-full w-full grid-cols-7 overflow-scroll rounded-[3px]  md:h-[85%] md:overflow-hidden"
          >
            {' '}
            {escalaObj.map((day, index) => (
              <div key={index}>
                {day.day > 0 && (
                  <div
                    onClick={() => handleOpenModal(day)}
                    className={`
                    relative flex h-20 w-full cursor-pointer flex-col items-center justify-start  
                    rounded-[3px] 
                    border border-foreground/10 hover:border
                    hover:border-primary/60 md:min-h-[100%]  ${day.day === date.getDate() && day.month === date.getMonth() ? 'border-primary/60 ' : ''} `}
                  >
                    {day.dayEvent.map((itemEvent, index) => (
                      <div key={index} className="m-0 self-start p-0 text-sm">
                        <Badge
                          className={` hidden  md:block ${
                            itemEvent.group.charAt(0).toUpperCase() === 'A'
                              ? 'border-primary text-primary'
                              : itemEvent.group.charAt(0).toUpperCase() === 'B'
                                ? 'border-blue-500 text-blue-500'
                                : itemEvent.group.charAt(0).toUpperCase() ===
                                    'C'
                                  ? 'border-green-600 text-green-600'
                                  : itemEvent.group.charAt(0).toUpperCase() ===
                                      'D'
                                    ? 'border-yellow-400 text-yellow-400'
                                    : itemEvent.group
                                          .charAt(0)
                                          .toUpperCase() === 'E'
                                      ? 'border-[#9400d3] text-[#9400d3]'
                                      : ''
                          }`}
                          variant="outline"
                        >
                          {itemEvent.group}
                        </Badge>
                        <p
                          className={` block text-lg md:hidden 
                          ${
                            itemEvent.group.charAt(0).toUpperCase() === 'A'
                              ? 'text-primary'
                              : itemEvent.group.charAt(0).toUpperCase() === 'B'
                                ? 'text-blue-500'
                                : itemEvent.group.charAt(0).toUpperCase() ===
                                    'C'
                                  ? 'text-green-600'
                                  : itemEvent.group.charAt(0).toUpperCase() ===
                                      'D'
                                    ? 'text-yellow-400'
                                    : itemEvent.group
                                          .charAt(0)
                                          .toUpperCase() === 'E'
                                      ? 'border-[#9400d3] text-[#9400d3]'
                                      : ''
                          }`}
                        >
                          {itemEvent.group.charAt(0).toUpperCase()}
                        </p>
                      </div>
                    ))}

                    <div className="absolute bottom-0 right-0 p-0 text-2xl font-thin text-muted-foreground md:text-4xl ">
                      <p className=" m-2">{day.day}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default CalendarGso
