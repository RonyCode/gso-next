'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { GrGroup } from 'react-icons/gr'
import {
  LuBuilding2,
  LuCalendarDays,
  LuCar,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardEdit,
  LuClock1,
  LuLoader2,
  LuMinusCircle,
  LuMousePointerClick,
  LuPlusCircle,
  LuSave,
  LuTrash2,
  LuUser,
  LuUsers,
  LuUsers2,
} from 'react-icons/lu'

import { saveUnidadeAction } from '@/app/(private)/(modules)/[sigla]/organizacao/actions/saveUnidadeAction'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import { type ICarSchema } from '@/schemas/CarsSchema'
import {
  type IScheduleFormSave,
  ScheduleFormSave,
} from '@/schemas/ScheduleFormSave'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import type { AddressProps } from '@/types/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion'
import { Avatar, AvatarImage } from '@/ui/avatar'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Separator } from '@/ui/separator'
import { Textarea } from '@/ui/textarea'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  unidade?: IUnidadeSchema | null
  schedule?: { schedule: IScheduleFormSave; cars: ICarSchema[] }
  className?: string
  states?: AddressProps[] | null
  params?: { sigla: string; name_unidade: string }
  searchParams?: Record<string, string | string[]>
}

export const TabScheduleSave = ({
  unidade,
  schedule,
  className,
  params,
  searchParams,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const [disabled, setDisabled] = React.useState(true)
  const [carSchedule, setCarSchedule] = React.useState<ICarSchema[]>(
    schedule?.cars ?? ([] as ICarSchema[]),
  )
  const router = useRouter()
  const form = useForm<IScheduleFormSave>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(ScheduleFormSave),
    defaultValues: {
      id: schedule?.schedule?.id ?? null,
      id_company: unidade?.id ?? undefined,
      id_member_creator: schedule?.schedule?.id_member_creator ?? undefined,
      id_cmt_sos:
        unidade?.companyMembers?.find(
          (item) =>
            item?.id_function === 3 &&
            item?.id_schedule === schedule?.schedule?.id,
        )?.id ?? undefined,
      id_member_comunication:
        schedule?.schedule?.id_member_creator ?? undefined,
      date:
        schedule?.schedule?.date != null
          ? new Date(schedule?.schedule?.date)
          : new Date(),
      hour_start: schedule?.schedule?.hour_start ?? '',
      hour_finish: schedule?.schedule?.hour_finish ?? '',
      team: schedule?.schedule?.team ?? undefined,
      situation: schedule?.schedule?.situation ?? null,
      type: schedule?.schedule?.type ?? undefined,
      status: schedule?.schedule?.status ?? null,
      date_creation:
        schedule?.schedule?.date_creation != null
          ? new Date(schedule?.schedule?.date_creation)
          : undefined,
      obs: schedule?.schedule?.obs ?? '',
      short_name_corp:
        schedule?.schedule?.short_name_corp ?? params?.sigla ?? '',
      short_name_comp:
        schedule?.schedule?.short_name_comp ?? params?.name_unidade ?? '',
      cars: schedule?.cars ?? ([] as ICarSchema[]),
      excluded: schedule?.schedule?.excluded ?? 0,
    },
  })

  useEffect(() => {
    searchParams?.id_schedule !== null && setDisabled(false)
  }, [searchParams?.id_schedule])

  console.log(form.getValues('cars'))
  console.log(schedule?.cars)

  const handleSubmit = async (formData: IScheduleFormSave): Promise<void> => {
    startTransition(async () => {
      console.log(JSON.stringify(form.getValues(), null, 2))
      console.log(JSON.stringify(form.formState.errors, null, 2))

      // const result = await saveUnidadeAction(formData)
      // if (result?.code !== 202) {
      //   toast({
      //     variant: 'danger',
      //     title: 'Erro ao salvar Escala! 🤯 ',
      //     description: result?.message,
      //   })
      // }
      // if (result?.code === 202) {
      //   toast({
      //     variant: 'success',
      //     title: 'Ok! Escala salva com sucesso! 🚀',
      //     description: 'Tudo certo Escala salva',
      //   })
      //   redirect(
      //     `/${params?.sigla.toLowerCase()}/unidades/${params?.name_unidade.toLowerCase()}`,
      //   )
      // }
    })
  }

  const handleDeleteAction = async (
    formData: IScheduleSchema,
  ): Promise<void> => {
    formData.excluded = 1
    startTransition(async () => {
      const result = await saveUnidadeAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao excluir escala! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! Escala excluída com sucesso! 🚀',
          description: 'Tudo certo escala excluída',
        })
        router.push(
          `/${params?.sigla.toLowerCase()}/unidades/${params?.name_unidade.toLowerCase()}`,
        )
      }
    })
  }

  const horarios = [
    '01:00:00',
    '02:00:00',
    '03:00:00',
    '04:00:00',
    '05:00:00',
    '06:00:00',
    '07:00:00',
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
    '21:00:00',
    '22:00:00',
    '23:00:00',
    '00:00:00',
  ]

  const tipos = [
    { id: 1, name: 'NORMAL' },
    { id: 2, name: 'EXTRA' },
    { id: 3, name: 'ORDEM SERVIÇO' },
  ]

  const team = [
    { id: 1, name: 'ALFA' },
    { id: 2, name: 'BRAVO' },
    { id: 3, name: 'CHARLIE' },
    { id: 4, name: 'DELTA' },
    { id: 5, name: 'EXTRA' },
  ]

  const veiculoUnidade = unidade?.companyCars?.find((car) => {
    return form
      ?.getValues('cars')
      ?.find((value) => value?.car?.id?.toString() === car?.id?.toString())
  })

  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn(' mb-4 p-2  md:p-6', className)}
        {...props}
      >
        <div className="flex items-center ">
          <div className="flex w-full items-center">
            <div className="mb-6 flex w-full items-center justify-between  border-b border-foreground/10">
              <h1 className="ml-4  py-4 text-xl font-bold">Detalhes</h1>{' '}
              {schedule?.schedule?.id != null && (
                <div className="flex  items-center gap-2">
                  <div className="text-md font-bold">
                    <Badge
                      className={` block ${
                        schedule?.schedule?.team === 1
                          ? 'border-primary/85 text-primary/85'
                          : schedule?.schedule?.team === 2
                            ? 'border-blue-500/85 text-blue-500/85'
                            : schedule?.schedule?.team === 3
                              ? 'border-yellow-400/85 text-yellow-400/85'
                              : schedule?.schedule?.team === 4
                                ? 'border-green-500/85 text-green-500/85'
                                : schedule?.schedule?.team === 5
                                  ? 'border-[#9400d3]/85 text-[#9400d3]/85'
                                  : ''
                      }`}
                      variant="outline"
                    >
                      <span className="flex items-center gap-1 ">
                        {' '}
                        <GrGroup />
                        <p>
                          {schedule?.schedule?.team === 1
                            ? 'ALFA'
                            : schedule?.schedule?.team === 2
                              ? 'BRAVO'
                              : schedule?.schedule?.team === 3
                                ? 'CHARLIE'
                                : schedule?.schedule?.team === 4
                                  ? 'DELTA'
                                  : schedule?.schedule?.team === 5
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
                    {schedule?.schedule?.date_creation != null && (
                      <div className="font-bold text-muted-foreground">
                        {' '}
                        {format(
                          new Date(schedule?.schedule?.date_creation),
                          'eeeeee',
                          {
                            locale: ptBR,
                          },
                        ) +
                          '  | ' +
                          format(
                            new Date(schedule?.schedule?.date_creation),
                            'dd/MM',
                            {
                              locale: ptBR,
                            },
                          )}
                      </div>
                    )}
                  </span>
                </div>
              )}
              <div>
                {schedule?.schedule?.id != null && (
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button disabled={pending} variant="secondary">
                          <LuTrash2
                            className="text-foreground group-hover:text-muted-foreground"
                            size={24}
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Excluir Escala</DialogTitle>
                          <DialogDescription>
                            Está ação precisa ser confirmada
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p>
                            {' '}
                            ATENÇÂO!!! Tem certeza que deseja excluir esta
                            escala de sua unidade?
                          </p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <div>
                              <Button variant="secondary" type="button">
                                Cancelar
                              </Button>

                              <Button
                                className="ml-2"
                                type="button"
                                /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                onClick={form.handleSubmit(async (data) => {
                                  await handleDeleteAction(data)
                                })}
                              >
                                Confirmar
                              </Button>
                            </div>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => {
                        setDisabled(!disabled)
                      }}
                      disabled={pending}
                      className="ml-2"
                      variant="secondary"
                    >
                      <LuClipboardEdit
                        className="text-foreground group-hover:text-muted-foreground"
                        size={24}
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <LoadingPage pending={pending} />
          <form
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onSubmit={form.handleSubmit(async (data) => {
              handleSubmit(data)
            })}
            className="w-full md:space-y-4  "
          >
            <div className="flex w-full flex-col gap-4 pr-2 md:flex-row  md:px-6">
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="short_name_comp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="flex items-center gap-1 text-muted-foreground"
                        htmlFor="name"
                      >
                        <LuBuilding2 />
                        Unidade
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          {...field}
                          id="short_name_comp"
                          placeholder="Nome Unidade"
                          value={unidade?.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="id_cmt_sos"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="id_cmt_sos"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuMousePointerClick />
                        CMT Socorro
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
                              {field.value !== null
                                ? unidade?.companyMembers?.find(
                                    (member) =>
                                      member?.id?.toString() ===
                                      field.value?.toString(),
                                  )?.name
                                : 'Selecione um membro'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando unidade ..." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {unidade?.companyMembers?.map(
                                  (member, index) => (
                                    <div key={index}>
                                      {member?.id_car === null && (
                                        <CommandItem
                                          disabled={disabled}
                                          value={String(member?.id)}
                                          onSelect={() => {
                                            member?.id != null &&
                                              form.setValue(
                                                'id_cmt_sos',
                                                member?.id,
                                              )
                                          }}
                                        >
                                          <LuCheck
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              member?.id === field?.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                          {member?.name}
                                        </CommandItem>
                                      )}
                                    </div>
                                  ),
                                )}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="id_member_creator"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="id_member_creator"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuMousePointerClick />
                        Escalante
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
                              {field.value !== null
                                ? unidade?.companyMembers?.find(
                                    (member) =>
                                      member?.id?.toString() ===
                                      field.value?.toString(),
                                  )?.name
                                : 'Selecione um membro'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando unidade ..." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {unidade?.companyMembers?.map(
                                  (member, index) => (
                                    <CommandItem
                                      disabled={disabled}
                                      value={String(member?.id)}
                                      key={index}
                                      onSelect={() => {
                                        member?.id != null &&
                                          form.setValue(
                                            'id_member_creator',
                                            member?.id,
                                          )
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          member?.id === field?.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {member?.name}
                                    </CommandItem>
                                  ),
                                )}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="id_member_comunication"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="id_member_comunication"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuMousePointerClick />
                        Comunicação
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
                              {field.value !== null
                                ? unidade?.companyMembers?.find(
                                    (member) =>
                                      member?.id?.toString() ===
                                      field.value?.toString(),
                                  )?.name
                                : 'Selecione um membro'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando unidade ..." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {unidade?.companyMembers?.map(
                                  (member, index) => (
                                    <CommandItem
                                      disabled={disabled}
                                      value={String(member?.id)}
                                      key={index}
                                      onSelect={() => {
                                        member?.id != null &&
                                          form.setValue(
                                            'id_member_comunication',
                                            member?.id,
                                          )
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          member?.id === field?.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {member?.name}
                                    </CommandItem>
                                  ),
                                )}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 pr-2 md:flex-row md:px-6 ">
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="date_creation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel className="flex items-center gap-1 text-muted-foreground">
                        <LuCalendarDays />
                        Data de criação
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={disabled}
                              variant={'outline'}
                              className={cn(
                                'min-w-[240px] pl-3 text-left font-normal',
                                field?.value?.toString() === '' &&
                                  'text-muted-foreground',
                              )}
                            >
                              {field?.value?.toString() !== '' ? (
                                field?.value != null &&
                                format(field?.value, 'dd/MM/yyyy')
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={ptBR}
                            mode="single"
                            selected={field?.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="hour_start"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="hour_start"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuClock1 /> Hora Início
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
                              {field.value ?? 'Selecione um horário'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>horário não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {horarios?.map((horaInicio, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(horaInicio)}
                                    key={index}
                                    onSelect={() => {
                                      horaInicio != null &&
                                        form.setValue('hour_start', horaInicio)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        horaInicio === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {horaInicio}
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
              </div>
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="hour_finish"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="hour_finish"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuClock1 /> Hora Fim
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
                              {field.value ?? 'Selecione um horário'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>Horário não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {horarios?.map((horaFim, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(horaFim)}
                                    key={index}
                                    onSelect={() => {
                                      horaFim != null &&
                                        form.setValue('hour_finish', horaFim)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        horaFim === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {horaFim}
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
              </div>
              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="type"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuClock1 /> Tipo
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
                              {tipos?.find((tipo) => tipo?.id === field?.value)
                                ?.name ?? 'Selecione um horário'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>Tipo não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {tipos?.map((tipo, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(tipo.id)}
                                    key={index}
                                    onSelect={() => {
                                      tipo != null &&
                                        form.setValue('type', tipo.id)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        tipo?.id === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {tipo?.name}
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
              </div>

              <div className="h-full w-full  ">
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="team"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuUsers2 /> Equipe
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
                              {team?.find((tipo) => tipo?.id === field?.value)
                                ?.name ?? 'Selecione uma equipe'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>Tipo não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {team?.map((tipo, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(tipo.id)}
                                    key={index}
                                    onSelect={() => {
                                      tipo != null &&
                                        form.setValue('team', tipo.id)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        tipo?.id === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {tipo?.name}
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
              </div>
            </div>

            <div className="mb-6  w-full  gap-4 pr-2 md:flex-row md:px-6 ">
              <FormField
                disabled={disabled}
                control={form.control}
                name="obs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <LuClipboardEdit />
                      Observação
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Obrigatório relatar detalhes"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full gap-4   ">
              <div className="w-full rounded-sm border border-primary/30">
                <div className="flex w-full flex-col gap-4 rounded-sm p-4 md:flex-row md:items-center md:justify-between">
                  <FormLabel
                    htmlFor="cars"
                    className="flex items-center gap-1 text-muted-foreground"
                  >
                    <LuCar size={20} />
                    Viaturas
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="cars"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
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
                                {veiculoUnidade?.prefix != null ? (
                                  <div className="flex w-full items-center  gap-x-2">
                                    <span className="rounded-sm border border-primary/30 px-2 py-0.5">
                                      {veiculoUnidade?.prefix}
                                    </span>
                                    <span>{veiculoUnidade?.model}</span>
                                  </div>
                                ) : (
                                  'Selecione um veículo'
                                )}

                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="min-w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="procurando veículo ..." />
                              <CommandEmpty>
                                Veículo não encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {unidade?.companyCars?.map((car, index) => (
                                    <CommandItem
                                      disabled={disabled}
                                      value={car?.id?.toString()}
                                      key={index}
                                      onSelect={() => {
                                        car != null &&
                                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                          // @ts-expect-error
                                          setCarSchedule((prev) => [
                                            ...prev,
                                            { car },
                                          ])
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          carSchedule?.find(
                                            (value) =>
                                              value?.car?.id === car?.id,
                                          )?.car?.id === car?.id
                                            ? 'text-primary/60 opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      <div className="flex items-center gap-x-2 border border-muted">
                                        <span className="rounded-sm border border-primary/30 px-2 py-0.5">
                                          {car?.prefix}
                                        </span>
                                        <span>{car?.model}</span>
                                      </div>
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
                  <Button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      form.setValue('cars', carSchedule)
                    }}
                    size="sm"
                    type="button"
                    className="gap-1"
                  >
                    <LuPlusCircle size={20} />
                    <LuCar size={20} />
                  </Button>
                </div>

                <div className="w-full border border-muted pr-2 md:pl-2 md:pr-4">
                  {form.watch('cars')?.map((car, index) => (
                    <div
                      key={index}
                      className="m-1 flex w-full items-center gap-2 text-sm"
                    >
                      <Accordion
                        type="single"
                        collapsible
                        className="m-0 w-full rounded-sm border border-primary/60 px-2 md:px-5"
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="gap-2 p-2">
                            <div className="flex w-full items-center  gap-2 rounded-sm ">
                              <Avatar className="hover:scale-[200%]">
                                <AvatarImage
                                  src={
                                    car?.car?.image ??
                                    process.env.NEXT_PUBLIC_API_GSO +
                                      '/public/images/calendar.jpg'
                                  }
                                />
                              </Avatar>
                              <span className="rounded-sm border border-primary/30 px-2 py-0.5">
                                {car?.car?.prefix}
                              </span>
                              <span>{car?.car?.model}</span>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  <LuMinusCircle size={16} />
                                  <LuCar size={16} />{' '}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Tem certeza que deseja excluir veiculo da
                                    escala?
                                  </DialogTitle>
                                  <DialogDescription>
                                    Está ação irá remover veiculo da escala.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose>
                                    <div className="flex items-center gap-2">
                                      <Button type="button" variant="secondary">
                                        Cancelar
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          carSchedule?.splice(index, 1)
                                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                          // @ts-expect-error
                                          form.setValue('cars', carSchedule)
                                        }}
                                        size="sm"
                                        type="button"
                                        className="gap-1"
                                      >
                                        <LuTrash2 size={16} />{' '}
                                      </Button>
                                    </div>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </AccordionTrigger>
                          <Separator />
                          <AccordionContent>
                            <div className="my-4 flex items-center justify-between gap-4">
                              <Label
                                htmlFor="type"
                                className="flex items-center gap-1 text-muted-foreground"
                              >
                                <LuUsers />
                                <h4 className="hidden md:block">Membros</h4>
                              </Label>{' '}
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
                                      {unidade?.companyMembers?.find((member) =>
                                        car?.members?.find(
                                          (memberCar) =>
                                            member?.id === memberCar?.id,
                                        ),
                                      )?.name ?? 'Selecione um membro'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="procurando horário ..." />
                                    <CommandEmpty>
                                      Tipo não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {unidade?.companyMembers?.map(
                                          (member, index) => (
                                            <CommandItem
                                              disabled={disabled}
                                              key={index}
                                              onSelect={() => {
                                                setCarSchedule((prev) => {
                                                  return prev.map((value) => {
                                                    if (
                                                      value?.car?.id ===
                                                      car?.car?.id
                                                    ) {
                                                      if (
                                                        car?.members == null
                                                      ) {
                                                        return {
                                                          ...value,
                                                          members: [member],
                                                        }
                                                      } else {
                                                        return {
                                                          ...value,
                                                          members: [
                                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                            // @ts-expect-error
                                                            // eslint-disable-next-line no-unsafe-optional-chaining
                                                            ...value?.members,
                                                            member,
                                                          ],
                                                        }
                                                      }
                                                    }
                                                    return value
                                                  })
                                                })
                                              }}
                                            >
                                              <LuCheck
                                                className={cn(
                                                  'mr-2 h-4 w-4',
                                                  carSchedule?.find((value) =>
                                                    value?.members?.find(
                                                      (memberCheck) =>
                                                        memberCheck?.id ===
                                                          member?.id &&
                                                        value.car?.id ===
                                                          car?.car?.id,
                                                    ),
                                                  ) !== undefined
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                                )}
                                              />
                                              {member?.name}
                                            </CommandItem>
                                          ),
                                        )}
                                      </CommandList>
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                              <Button
                                onClick={() => {
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-expect-error
                                  form.setValue('cars', carSchedule)
                                }}
                                size="sm"
                                variant="default"
                                className="mr-2 flex items-center gap-1"
                              >
                                <LuPlusCircle size={16} />
                                <LuUser size={16} />
                              </Button>
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                              <span>Componentes ({car?.members?.length})</span>
                            </div>
                            {car?.members?.map((member, indexMember) => (
                              <div
                                key={indexMember}
                                className="flex items-center justify-between gap-2 border border-muted p-2"
                              >
                                <div className="flex items-center gap-2 ">
                                  <Avatar className="hover:scale-[200%]">
                                    <AvatarImage
                                      src={
                                        member?.image ??
                                        process.env.NEXT_PUBLIC_API_GSO +
                                          '/public/images/calendar.jpg'
                                      }
                                    />
                                  </Avatar>
                                  <span className="rounded-sm border border-primary/30 px-2 py-0.5">
                                    {member?.competence}
                                  </span>
                                  <span>{member?.name}</span>
                                </div>
                                <Button
                                  size="sm"
                                  className="gap-1"
                                  variant="secondary"
                                  onClick={() => {
                                    carSchedule.map((itemSchedule) =>
                                      itemSchedule.members?.splice(
                                        indexMember,
                                        1,
                                      ),
                                    )
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    form.setValue('cars', carSchedule)
                                  }}
                                >
                                  <LuMinusCircle size={16} />
                                  <LuUser size={16} />
                                </Button>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
              {!disabled && (
                <Button
                  onClick={() => {
                    console.log(JSON.stringify(form.formState.errors, null, 2))
                  }}
                  size="sm"
                  variant="default"
                  disabled={pending}
                  className={cn(' animate-fadeIn gap-1 md:mr-4')}
                  type="submit"
                >
                  {pending && (
                    <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <LuSave size={20} />
                  Salvar
                </Button>
              )}{' '}
            </div>
          </form>
        </Form>
      </Card>
    </>
  )
}
export default TabScheduleSave
