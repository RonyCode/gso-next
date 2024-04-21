'use client'

const CalendarGso = () => {
  const days = [
    { diaSigla: 'Dom', dia: 'Domingo' },
    { diaSigla: 'Seg', dia: 'Segunda' },
    { diaSigla: 'Ter', dia: 'Terça' },
    { diaSigla: 'Qua', dia: 'Quarta' },
    { diaSigla: 'Qui', dia: 'Quinta' },
    { diaSigla: 'Sex', dia: 'Sexta' },
    { diaSigla: 'Sab', dia: 'Sábado' },
  ]
  const blockDay = []

  const date = new Date()
  const queueOne = [
    {
      day: 0,
      dayWeek: 0,
    },
  ]

  const queueTwo = [
    {
      day: 0,
      dayWeek: 0,
    },
  ]

  for (let i = 0; i < 14; i++) {
    console.log(i % 7)
    if (i % 7 != 0) {
      queueOne.push({
        day: date.getDate() + i,
        dayWeek: date.getDay() + (i % 7),
      })
    } else {
      queueOne.push({
        day: date.getDate() + i,
        dayWeek: 0,
      })
    }
  }
  queueOne.shift()
  console.log(queueOne)
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="wrapper w-full rounded bg-secondary shadow ">
          <div className="header flex justify-between border-b  border-foreground/60 p-2">
            <span className="text-lg font-bold">2020 July</span>
            <div className="buttons">
              <button className="p-1"></button>
              <button className="p-1"></button>
            </div>
          </div>
          <table className="w-full border  border-foreground/60">
            <thead>
              <tr>
                {days.map((day) => (
                  <th
                    key={day.diaSigla}
                    className="lg:w-30 md:w-30 h-10 w-10 border-r border-foreground/60 p-2 text-xs sm:w-20 xl:w-40 xl:text-sm"
                  >
                    <span className="hidden sm:block md:block lg:block xl:block">
                      {day.dia}
                    </span>
                    <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                      {day.diaSigla}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="h-20 text-center">
                {blockDay.map((day) => (
                  <td
                    key={day.day}
                    className="lg:w-30 md:w-30 ease h-40 w-10 cursor-pointer overflow-auto border border-foreground/60 p-1 transition duration-500 hover:bg-gray-300 sm:w-20 xl:w-40 "
                  >
                    <div className="lg:w-30 md:w-30 mx-auto flex h-40 w-10 flex-col overflow-hidden sm:w-full xl:w-40">
                      <div className="top h-5 w-full">
                        <span className="text-foreground/60">{day.day}</span>
                      </div>

                      <div className="bottom h-30 w-full flex-grow cursor-pointer py-1">
                        <div className="event mb-1 rounded bg-purple-400 p-1 text-sm text-white">
                          <span className="event-name">{day.event}</span>
                          <span className="time">{day.time}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default CalendarGso
