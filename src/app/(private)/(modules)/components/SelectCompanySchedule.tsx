'use client'
import React, { useState, useTransition } from 'react'
import { LuCheck, LuChevronsUpDown } from 'react-icons/lu'

import CalendarGso from '@/components/CalendarGso/CalendarGso'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { getUnidadeById } from '@/lib/GetUnidadeById'
import { cn } from '@/lib/utils'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import type { FunctionsMembers } from '@/types/index'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

type SelectCompanyModuleProps = React.HTMLAttributes<HTMLDivElement> & {
  unidades?: IUnidadeSchema[]
  functions?: FunctionsMembers[]
  className?: string
}

export const SelectCompanySchedule = ({
  unidades,
  functions,
  className,
  ...props
}: SelectCompanyModuleProps): JSX.Element => {
  const disabled = false
  const [dataUnidade, setDataUnidade] = useState<IUnidadeSchema | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSelectUnidade = (unidadeOnSelect: IUnidadeSchema): void => {
    startTransition(async () => {
      if (unidadeOnSelect !== null && unidadeOnSelect !== undefined) {
        const { data } = await getUnidadeById(
          unidadeOnSelect.id_corporation?.toString() ?? '',
          unidadeOnSelect?.id?.toString() ?? '',
        )
        data.short_name_comp = unidades?.find(
          (uniItem) => uniItem.id === unidadeOnSelect.id,
        )?.name
        setDataUnidade(data)
      }
    })
  }

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="bg-background ">
        <LoadingPage pending={isPending} />
        <div className="flex items-center">
          <Card className="flex w-full flex-col items-center justify-between gap-2 p-2 ">
            <h1 className="mr-auto  text-xl font-bold">Minha unidade</h1>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-full justify-between',
                    disabled && 'text-muted-foreground',
                  )}
                >
                  {dataUnidade !== null
                    ? unidades?.find(
                        (state) =>
                          dataUnidade?.id?.toString() === state?.id?.toString(),
                      )?.name
                    : 'Selecione uma unidade'}
                  <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Procurando unidades..." />
                  <CommandEmpty>Unidade não encontrada.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {unidades?.map((state, indexUnidade) => (
                        <CommandItem
                          disabled={disabled}
                          value={state?.id?.toString()}
                          key={indexUnidade}
                          onSelect={handleSelectUnidade.bind(null, state)}
                        >
                          <LuCheck
                            className={cn(
                              'mr-2 h-4 w-4',
                              state?.id?.toString() ===
                                dataUnidade?.id?.toString()
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {state.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </Card>
        </div>
      </Card>
      <div>
        {dataUnidade?.companySchedules != null && (
          <div>
            <CalendarGso unidade={dataUnidade} functions={functions} />
          </div>
        )}
      </div>
    </>
  )
}
export default SelectCompanySchedule
