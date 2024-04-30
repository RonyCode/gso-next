import * as React from 'react'
import { Badge } from '@/ui/badge'
import { cn } from '@/lib/utils'
import { EventProps } from '../../../types/index'

type CalendarGsoGridProps = {
  dayEvent?: EventProps[]
  month?: number
  day?: number
  index?: number
} & React.HTMLAttributes<HTMLDivElement>

const CalendarGsoGrid = ({
  dayEvent,
  month,
  day,
  className,
  ...props
}: CalendarGsoGridProps) => {
  const date = new Date()

  return (
    <>
      {day! > 0 && (
        <div
          className={cn(
            `  relative flex h-20 w-full cursor-pointer flex-col items-center justify-start  
                              rounded-[3px] 
                              border border-foreground/10 hover:border
                              hover:border-primary/60 md:min-h-[100%]  ${day === date.getDate() && month === date.getMonth() ? 'border-primary/60 ' : ''} `,
            className,
          )}
          {...props}
        >
          {dayEvent?.map((itemEvent, indexEvent) => (
            <div key={indexEvent} className="m-0 self-start pb-1 text-sm ">
              <Badge
                className={` hidden  md:block  ${
                  itemEvent.group.charAt(0).toUpperCase() === 'A'
                    ? 'border-primary text-primary'
                    : itemEvent.group.charAt(0).toUpperCase() === 'B'
                      ? 'border-blue-500 text-blue-500'
                      : itemEvent.group.charAt(0).toUpperCase() === 'C'
                        ? 'border-green-600 text-green-600'
                        : itemEvent.group.charAt(0).toUpperCase() === 'D'
                          ? 'border-yellow-400 text-yellow-400'
                          : itemEvent.group.charAt(0).toUpperCase() === 'E'
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
            <p className=" m-2">{day}</p>
          </div>
        </div>
      )}
    </>
  )
}
export default CalendarGsoGrid
