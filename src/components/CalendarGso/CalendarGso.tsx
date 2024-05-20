'use client'

import { EventProps } from '../../../types/index'
import { LucideArrowBigLeft, LucideArrowBigRight } from 'lucide-react'
import { Button } from '@/ui/button'
import { useState } from 'react'
import { columnsEscala } from '@/components/DataTables/DataTableEscala/columnsEscala'
import { ModalGso } from '@/components/Modal/ModalGso/ModalGso'
import CalendarGsoGrid from '@/components/CalendarGso/CalendarGsoGrid'
import { CardListEscala } from '@/components/Cards/CardListEscala'
import { DataTableEscala } from '@/components/DataTables/DataTableEscala/data-table-escala'

type DaysMonthProps = {
  dias: number
  diference: number
}

const CalendarGso = ({ event }: { event: EventProps[] }) => {
  const date = new Date()
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [dayWeek, setDayWeek] = useState(date.getDay())
  useState(0)

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
    { nameDay: 'Domingo', shortNameDay: 'Dom' },
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

    switch (numberMonth) {
      case 0: {
        return { dias: 31, diference: 0 } as DaysMonthProps
      }

      case 1: {
        if (year % 4 === 0 && lastDigiteYear !== '00') {
          return { dias: 29, diference: 3 } as DaysMonthProps
        } else {
          return { dias: 28, diference: 4 } as DaysMonthProps
        }
      }
      case 2:
        return { dias: 31, diference: 2 } as DaysMonthProps
      case 3:
        return { dias: 30, diference: 0 } as DaysMonthProps
      case 4:
        return { dias: 31, diference: 2 } as DaysMonthProps
      case 5:
        return { dias: 30, diference: 5 } as DaysMonthProps
      case 6:
        return { dias: 31, diference: 0 } as DaysMonthProps
      case 7:
        return { dias: 31, diference: 3 } as DaysMonthProps
      case 8:
        return { dias: 30, diference: 6 } as DaysMonthProps
      case 9:
        return { dias: 31, diference: 1 } as DaysMonthProps
      case 10:
        return { dias: 30, diference: 3 } as DaysMonthProps
      case 11:
        return { dias: 31, diference: 6 } as DaysMonthProps
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
    dayWeek === date.getDay()
      ? daysInMonth!.dias! + daysInMonth!.diference
      : daysInMonth!.dias! + Math.abs(dayWeek)
  for (let i = 0; i <= daysCalculate!; i++) {
    if (i % 7) {
      escalaObj.push({
        day:
          dayWeek === date.getDay() ? i - daysInMonth!.diference : dayWeek + i,
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
        dayEvent: handleEventDay(
          dayWeek === date.getDay() ? i - daysInMonth!.diference : dayWeek + i,
          month,
          year,
          event,
        ),
        year,
        month,
      })
    } else {
      escalaObj.push({
        day:
          dayWeek === date.getDay() ? i - daysInMonth!.diference : i + dayWeek,
        dayWeek: 0,
        dayShortName: 'Dom',
        dayName: 'Domingo',
        dayEvent: handleEventDay(
          dayWeek === date.getDay() ? i - daysInMonth!.diference : dayWeek + i,
          month,
          year,
          event,
        ),
        year,
        month,
      })
    }
  }
  escalaObj.shift()

  const handlePrevious = () => {
    const lastDayWeek = escalaObj[escalaObj.length - 1].dayWeek
    const monthChanged = handleCountDaysInMonth(month - 1)
    const diffDayInMounts = daysInMonth!.dias! - monthChanged!.dias!
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

  const eventsList: EventProps[] = []
  escalaObj.forEach((item) => {
    item.dayEvent.forEach((event) => {
      eventsList.push(event)
    })
  })

  return (
    <>
      <div className="mt-12 grid h-[80vh] w-full grid-cols-12  md:mt-0 ">
        {/* TABLE ESCALA */}
        <div
          className={`col-start-1  col-end-13  mt-12 h-[80vh] w-full rounded-[5px] bg-background p-2 md:col-end-7 md:mt-0`}
        >
          <div>
            <DataTableEscala data={eventsList as []} columns={columnsEscala} />
          </div>
        </div>

        {/* HEADER GRID WEEK */}
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
            grid h-10 w-full grid-cols-7 place-content-center rounded-[3px]"
          >
            {diasSemana.map((day, index) => (
              <div
                key={index}
                className="  w-full cursor-pointer flex-col items-center
                justify-center rounded-[3px] border border-foreground/10
                p-2 text-center hover:border
                hover:border-primary/60  md:flex lg:h-full"
              >
                <span className="hidden sm:block md:block lg:block xl:block">
                  {day.nameDay}
                </span>
                <span className="block text-center sm:hidden md:hidden lg:hidden xl:hidden">
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
              // MODAL TRIGGER
              <ModalGso
                className="overflow-auto px-4 md:h-[80vh] md:w-[80vw] "
                key={index}
                title="Detalhes Escala"
                description="Dados da Escala"
                childrenButton={
                  <div key={index}>
                    {day.day > 0 && (
                      // GRID CALENDAR
                      <CalendarGsoGrid
                        index={index - daysInMonth!.dias!}
                        day={day.day}
                        dayEvent={day.dayEvent}
                        month={day.month}
                        className="h-24 w-full"
                      />
                    )}
                  </div>
                }
              >
                <div className="flex h-full w-full flex-col ">
                  {day.dayEvent.map((itemEvent, indexEvent) => (
                    <CardListEscala
                      key={indexEvent}
                      itemEvent={itemEvent}
                      className="my-2 border border-foreground/30"
                    />
                  ))}
                </div>
              </ModalGso>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default CalendarGso
