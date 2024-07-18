'use client'
import { redirect, useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuBuilding2,
  LuCalendarDays,
  LuCar,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardEdit,
  LuClock1,
  LuLoader2,
  LuMousePointerClick,
  LuPlus,
  LuPlusCircle,
  LuTrash2,
  LuUser,
  LuUserPlus,
  LuUsers,
} from 'react-icons/lu'

import { saveUnidadeAction } from '@/app/(private)/(modules)/[sigla]/organizacao/actions/saveUnidadeAction'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import { type IScheduleSchema, ScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import type { AddressProps } from '@/types/index'
import { Button, buttonVariants } from '@/ui/button'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  unidade?: IUnidadeSchema | null
  schedule?: { schedule: IScheduleSchema }
  className?: string
  states?: AddressProps[] | null
  params?: { sigla: string; name_unidade: string }
}

export const TabScheduleSave = ({
  unidade,
  schedule,
  className,
  params,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const [disabled, setDisabled] = React.useState(true)
  const router = useRouter()

  const form = useForm<IScheduleSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      id: schedule?.schedule?.id ?? undefined,
      id_company: unidade?.id ?? undefined,
      id_member_creator: schedule?.schedule?.id_member_creator ?? undefined,
      date: schedule?.schedule?.date ?? '',
      hour_start: schedule?.schedule?.hour_start ?? '',
      hour_finish: schedule?.schedule?.hour_finish ?? '',
      team: schedule?.schedule?.team ?? undefined,
      situation: schedule?.schedule?.situation ?? undefined,
      type: schedule?.schedule?.type ?? undefined,
      status: schedule?.schedule?.status ?? undefined,
      date_creation: schedule?.schedule?.date_creation ?? undefined,
      obs: schedule?.schedule?.obs ?? '',
      short_name_corp: schedule?.schedule?.short_name_corp ?? '',
      short_name_comp: schedule?.schedule?.short_name_comp ?? '',
      cars: schedule?.schedule?.cars ?? [],
      excluded: schedule?.schedule?.excluded ?? 0,
    },
  })

  const handleSubmit = (formData: Partial<IScheduleSchema>): void => {
    startTransition(async () => {
      const result = await saveUnidadeAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao salvar unidade! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! Unidade salva com sucesso! 🚀',
          description: 'Tudo certo unidade salva',
        })
        redirect(
          `/${params?.sigla.toLowerCase()}/unidades/${params?.name_unidade.toLowerCase()}`,
        )
      }
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

  if (schedule?.schedule?.id !== null && schedule?.schedule?.id !== undefined) {
    const index = Number(schedule.schedule.id) ?? 0
    console.log(schedule.schedule)
  }

  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn(' ', className)}
        {...props}
      >
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between p-6">
            <h1 className="ml-4 mr-auto text-xl font-bold">Detalhes</h1>
            {schedule?.schedule?.id != null && (
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      disabled={pending}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'group ',
                      )}
                    >
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
                        ATENÇÂO!!! Tem certeza que deseja excluir esta escala de
                        sua unidade?
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
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'group ',
                  )}
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
        <Form {...form}>
          <LoadingPage pending={pending} />
          <form
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onSubmit={form.handleSubmit(async (data) => {
              handleSubmit(data)
            })}
            className="w-full space-y-4 px-6"
          >
            <div className="flex w-full gap-4">
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
            </div>
            <div className="flex w-full gap-4">
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
            </div>
            <div className="flex w-full gap-4  ">
              <div className="flex w-full flex-col items-center justify-between rounded-sm border border-primary/30 p-2">
                <div className="flex w-full items-center justify-between rounded-sm border border-primary/30 p-2">
                  <label htmlFor="" className="flex items-center gap-2">
                    <LuCar size={20} />
                    Viaturas
                  </label>
                  <Button type="button" className="gap-1">
                    <LuCar size={20} />
                    <LuPlusCircle size={20} />
                  </Button>
                </div>
                <div className="flex w-full items-center justify-between rounded-sm border border-primary/30 p-2">
                  <FormField
                    control={form.control}
                    name="cars"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="cars"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuClock1 /> Veículo
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
                                {schedule?.schedule?.cars?.find(
                                  (car) =>
                                    car?.car?.id?.toString() ===
                                    field?.value?.toString(),
                                )?.car.prefix ?? 'Selecione um veículo'}
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
                                  {schedule?.schedule?.cars?.map(
                                    ({ car }, index) => (
                                      <CommandItem
                                        disabled={disabled}
                                        value={car.id}
                                        key={index}
                                        onSelect={() => {
                                          car != null &&
                                            form.setValue('cars', car.id)
                                        }}
                                      >
                                        <LuCheck
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            car?.id?.toString() ===
                                              field?.value?.toString()
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                        {car?.prefix}
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
              <div className="flex w-full items-center justify-between rounded-sm border border-primary/30 p-2">
                <label htmlFor="" className="flex items-center gap-2">
                  <LuUsers size={20} />
                  Efetivo
                </label>
                <Button type="button" className="gap-1">
                  <LuUser size={20} />
                  <LuPlusCircle size={20} />
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
              {!disabled && (
                <Button
                  disabled={pending && !form.formState.isValid}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    ' w-full animate-fadeIn  md:w-1/3 ',
                  )}
                  type="submit"
                >
                  {pending && (
                    <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
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
