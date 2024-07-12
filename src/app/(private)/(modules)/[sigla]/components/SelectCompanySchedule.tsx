'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LuCheck, LuChevronsUpDown, LuLandmark } from 'react-icons/lu'

import CalendarGso from '@/components/CalendarGso/CalendarGso'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import {
  type ISelectCorporationModuleSchema,
  SelectCorporationModuleSchema,
} from '@/schemas/SelectCorpoationModuleSchema'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'

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
}: SelectCompanyModuleProps) => {
  const disabled = false
  const { data: session } = useSession()
  const [dataUnidade, setDataUnidade] = useState<IUnidadeSchema>({})

  useEffect(() => {
    if (unidades !== undefined) {
      unidades?.forEach((unidade) => {
        if (unidade?.id?.toString() === session?.id_company?.toString()) {
          setDataUnidade(unidade)
        }
      })
    }
  }, [session?.id_company, unidades])

  const form = useForm<ISelectCorporationModuleSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(SelectCorporationModuleSchema),
    defaultValues: {
      id_company: session?.id_company ?? '',
      name_unidade: '',
    },
  })

  console.log(dataUnidade)
  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="bg-background  p-6">
        <div className="flex items-center">
          <Card className="flex w-full flex-col items-center justify-between gap-2 p-4 ">
            <h1 className="mr-auto pb-4 text-xl font-bold">Minhas unidades</h1>
            <Form {...form}>
              <form className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="id_company"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="id_company"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuLandmark /> Unidade
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
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
                                      dataUnidade?.id?.toString() ===
                                      state?.id?.toString(),
                                  )?.name
                                : 'Selecione uma unidade'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando unidades..." />
                            <CommandEmpty>Unidade não encontrada.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {unidades?.map((state, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={state?.id?.toString()}
                                    key={index}
                                    onSelect={() => {
                                      setDataUnidade(
                                        unidades?.find(
                                          (item) =>
                                            item?.id?.toString() ===
                                            state?.id?.toString(),
                                        ) ?? {},
                                      )
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        state?.id?.toString() === field.value
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </Card>
        </div>
      </Card>
      {dataUnidade !== null && (
        <CalendarGso unidade={dataUnidade} functions={functions} />
      )}
    </>
  )
}
export default SelectCompanySchedule
