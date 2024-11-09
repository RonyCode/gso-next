'use client'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import {
  LuBuilding2,
  LuCalendarCheck2,
  LuCar,
  LuCaseUpper,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardList,
  LuHash,
  LuListChecks,
  LuLoader2,
  LuSpellCheck2,
} from 'react-icons/lu'

import { saveVehicleIntoCorporationAction } from '@/app/actions/saveVehicleIntoCorporationAction'
import { EditPhoto } from '@/components/EditPhoto/EditPhoto'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { GetUserNotification } from '@/functions/GetNotificationUser'
import { getAllVehicles } from '@/lib/GetAllVehicles'
import { cn } from '@/lib/utils'
import { CarSchema, type ICarSchema } from '@/schemas/CarsSchema'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { Button, buttonVariants } from '@/ui/button'
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
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema[] | null
  myVehicle?: ICarSchema | null
  idCorporation?: string | undefined | null
  className?: string
  params?: { id_company: string; name_corporation: string }
}

export const VehicleCorporationForm = ({
  corporations,
  myVehicle,
  idCorporation,
  className,
  params,
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const [detailVehicle, setDetailVehicle] = useState<ICarSchema[]>([])
  const [modeloVehicle, setModeloVehicle] = useState<ICarSchema[]>([])
  const [modeloAno, setModeloAno] = useState<ICarSchema[]>([])

  const form = useForm<ICarSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CarSchema),
    shouldFocusError: true,
    defaultValues: {
      id: myVehicle?.id ?? undefined,
      id_corporation: idCorporation ?? undefined,
      id_brand: myVehicle?.id_brand ?? undefined,
      id_model: myVehicle?.id_model ?? undefined,
      id_year: myVehicle?.id_year ?? undefined,
      model: myVehicle?.model ?? undefined,
      brand: myVehicle?.brand ?? undefined,
      chassi: myVehicle?.chassi ?? undefined,
      year: myVehicle?.year ?? undefined,
      condition: myVehicle?.condition ?? undefined,
      status: myVehicle?.status ?? undefined,
      fuel_type: myVehicle?.fuel_type ?? undefined,
      type: myVehicle?.type ?? undefined,
      image: myVehicle?.image ?? null,
      plate: myVehicle?.plate ?? undefined,
      prefix: myVehicle?.prefix ?? undefined,
      subscription: null,
      excluded: myVehicle?.excluded ?? 0,
    },
  })

  console.log(form.getValues())

  const typeVehicle = [
    { type: 'carros' },
    { type: 'motos' },
    { type: 'caminhoes' },
  ]

  const status = [
    { id_status: '1', status: 'Operante' },
    { id_status: '2', status: 'Inoperante' },
  ]

  const conditions = [
    { id_condition: '1', condition: 'Novo' },
    { id_condition: '2', condition: 'Usado' },
    { id_condition: '3', condition: 'Em manuntençao' },
    { id_condition: '4', condition: 'Avariado' },
  ]

  const handleSubmit = (formData: ICarSchema): void => {
    startTransition(async () => {
      const result = await saveVehicleIntoCorporationAction(formData)

      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao salvar veículo na corporação! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        void GetUserNotification(
          result?.data?.notification?.queue_name ?? '',
          result?.data?.notification?.exchange ?? '',
          result?.data?.notification?.id_message ?? '',
        )
        toast({
          variant: 'success',
          title: `Ok! Veiculo salvo na corporação com sucesso! 🚀`,
          description: 'Tudo certo veículo salvo',
        })
        redirect(`/servicos/veiculos`)
      }
    })
  }
  useEffect(() => {
    handleSelectTypeVehicle()
    handleSelectBrandVehicle()
    handleSelectModel()
    handleSelectYearVehicle()
  }, [
    form?.getValues('type'),
    form?.getValues('id_brand'),
    form?.getValues('id_model'),
    form?.getValues('id_year'),
  ])

  const handleSelectTypeVehicle = (): void => {
    startTransition(async () => {
      if (form?.getValues('type') !== undefined) {
        const result1 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.getValues('type')}/marcas`,
        )
        if (result1 !== undefined && result1 !== null) {
          setDetailVehicle(result1 as unknown as ICarSchema[])
        }
      }
    })
  }

  const handleSelectBrandVehicle = (): void => {
    startTransition(async () => {
      if (
        form?.getValues('type') !== undefined &&
        form?.getValues('id_brand') !== undefined
      ) {
        const result2 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.getValues('type')}/marcas/${form?.getValues('id_brand')}/modelos`,
        )
        if (result2?.modelos !== undefined) {
          setModeloVehicle(result2?.modelos as unknown as ICarSchema[])
        }
      }
    })
  }

  const handleSelectModel = (): void => {
    startTransition(async () => {
      if (
        form?.getValues('type') !== undefined &&
        form?.getValues('id_brand') !== undefined &&
        form?.getValues('id_model') !== undefined
      ) {
        const result3 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.getValues('type')}/marcas/${form?.getValues('id_brand')}/modelos/${form?.getValues('id_model')}/anos`,
        )
        if (result3 !== undefined && result3 !== null) {
          setModeloAno(result3 as unknown as ICarSchema[])
        }
      }
    })
  }

  const handleSelectYearVehicle = (): void => {
    startTransition(async () => {
      if (
        form?.getValues('type') !== undefined &&
        form?.getValues('id_brand') !== undefined &&
        form?.getValues('id_model') !== undefined &&
        form?.getValues('id_year') !== undefined
      ) {
        const result4 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.getValues('type')}/marcas/${form?.getValues('id_brand')}/modelos/${form?.getValues('id_model')}/anos/${form?.getValues('id_year')}`,
        )

        if (result4 !== undefined && result4 !== null) {
          form.setValue('model', result4?.Modelo ?? '')
          form.setValue('brand', result4?.Marca ?? '')
          form.setValue('year', result4?.AnoModelo?.toString() ?? '')
          form.setValue('fuel_type', result4?.Combustivel ?? '')
        }
      }
    })
  }

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="p-4 md:p-6">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between space-y-2 p-4">
            <h1 className=" mr-auto text-xl font-bold">
              Salvar Veículo na Corporação
            </h1>
          </div>
        </div>
        <div className="my-2">
          <Form {...form}>
            <LoadingPage pending={pending} />
            <form
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onSubmit={form.handleSubmit(async (data) => {
                handleSubmit(data)
              })}
              className="w-full space-y-4"
            >
              <div className="grid h-full w-full grid-cols-12 ">
                <div className="col-span-12 flex w-full  md:col-start-1  md:col-end-5 md:mt-4">
                  <div className="flex h-full w-full flex-col items-center justify-center  rounded-[8px]">
                    <div
                      className=" relative aspect-square  h-48 w-full items-center justify-center rounded-[8px]
                                     border border-foreground/10  md:flex md:h-56 "
                    >
                      <div className="absolute -left-3 -top-3 z-10">
                        <EditPhoto
                          directoryFile={
                            process?.env?.NEXT_PUBLIC_API_GSO != null &&
                            form.getValues('image') != null
                              ? process?.env?.NEXT_PUBLIC_API_GSO +
                                form.getValues('image')
                              : process.env.NEXT_PUBLIC_API_GSO +
                                '/public/images/img.png'
                          }
                          updateFormExternal={form as unknown as UseFormReturn}
                        />
                      </div>
                      <Image
                        src={
                          process?.env?.NEXT_PUBLIC_API_GSO != null &&
                          form.getValues('image') != null
                            ? process?.env?.NEXT_PUBLIC_API_GSO +
                              form.getValues('image')
                            : process.env.NEXT_PUBLIC_API_GSO +
                              '/public/images/img.png'
                        }
                        fill
                        alt="imagem veiculo"
                        className="rounded-[5px] object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-start-1 col-end-13 mb-8 flex h-full w-full  md:my-4 md:ml-3 lg:col-start-5">
                  <div className="flex w-full grid-cols-1 flex-col  md:grid md:grid-cols-2 md:gap-4">
                    <div className=" flex w-full flex-col justify-evenly">
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="type"
                                className="flex w-full items-center gap-1"
                              >
                                <LuClipboardList /> Categoria
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined
                                        ? typeVehicle?.find(
                                            (vehicleItem) =>
                                              vehicleItem?.type === field.value,
                                          )?.type
                                        : 'Selecione uma categoria'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando tipo de veículo..." />
                                    <CommandEmpty>
                                      Categoria não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {typeVehicle?.map(
                                          (vehicleItem, index) => (
                                            <CommandItem
                                              value={
                                                vehicleItem?.type ?? undefined
                                              }
                                              key={index}
                                              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                              onSelect={() => {
                                                handleSelectTypeVehicle()
                                                form.setValue(
                                                  'type',
                                                  vehicleItem?.type,
                                                )
                                              }}
                                            >
                                              <LuCheck
                                                className={cn(
                                                  'mr-2 h-4 w-4',
                                                  vehicleItem?.type ===
                                                    field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                                )}
                                              />
                                              {vehicleItem?.type}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_model"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCar /> Modelo Veículo
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      modeloVehicle !== undefined
                                        ? modeloVehicle?.find((corp) => {
                                            return (
                                              corp?.codigo?.toString() ===
                                              field?.value?.toString()
                                            )
                                          })?.nome
                                        : 'Selecione um modelo de veículo'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando modelo Veículo..." />
                                    <CommandEmpty>
                                      Modelo não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {modeloVehicle?.map((car, index) => (
                                          <CommandItem
                                            value={car?.codigo ?? undefined}
                                            key={index}
                                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                            onSelect={() => {
                                              handleSelectModel()
                                              form.setValue(
                                                'id_model',
                                                car?.codigo?.toString() ?? '',
                                              )
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                car?.codigo?.toString() ===
                                                  field.value?.toString()
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {car?.nome}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_corporation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_corporation"
                                className="flex w-full items-center gap-1"
                              >
                                <LuBuilding2 /> Corporação
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      corporations !== undefined
                                        ? corporations?.find((corp) => {
                                            return corp?.id === field.value
                                          })?.short_name_corp
                                        : 'Selecione a corporação'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando corporação..." />
                                    <CommandEmpty>
                                      Corporação não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {corporations?.map((corp, index) => (
                                          <CommandItem
                                            value={corp?.id ?? undefined}
                                            key={index}
                                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                            onSelect={() => {
                                              form.setValue(
                                                'id_corporation',
                                                corp?.id ?? '',
                                              )
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                corp?.id === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {corp?.short_name_corp}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="chassi"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="chassi"
                                className="flex items-center gap-1"
                              >
                                <LuHash /> Chassis
                              </FormLabel>
                              <FormControl>
                                <InputMask
                                  {...field}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3
                                  py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent
                                  file:text-sm file:font-medium placeholder:text-muted-foreground
                                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                  disabled:cursor-not-allowed disabled:opacity-50"
                                  id="chassi"
                                  placeholder="ABCDE12A34F012345"
                                  mask="_________________"
                                  replacement={{
                                    _: /[A-z0-9]/,
                                  }}
                                  autoCapitalize="none"
                                  autoComplete="chassi"
                                  autoCorrect="off"
                                  onChange={(event) => {
                                    field.onChange(
                                      event.target.value.toUpperCase(),
                                    )
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="condition"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCalendarCheck2 /> Condição
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined
                                        ? conditions?.find((corp) => {
                                            return (
                                              +corp?.id_condition ===
                                              field.value
                                            )
                                          })?.condition
                                        : 'Selecione a condição do veículo'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando condição do Veículo..." />
                                    <CommandEmpty>
                                      Ano não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {conditions?.map((car, index) => (
                                          <CommandItem
                                            value={car?.id_condition}
                                            key={index}
                                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                            onSelect={() => {
                                              handleSelectYearVehicle()
                                              form.setValue(
                                                'condition',
                                                +car?.id_condition,
                                              )
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                +car?.id_condition ===
                                                  field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {car?.condition}
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
                    <div className=" flex w-full flex-col justify-evenly">
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_brand"
                                className="flex w-full items-center gap-1"
                              >
                                <LuListChecks /> Marca Veículo
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      detailVehicle !== undefined
                                        ? detailVehicle?.find((corp) => {
                                            return corp?.codigo === field.value
                                          })?.nome
                                        : 'Selecione uma marca de veículo'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando marca Veículo..." />
                                    <CommandEmpty>
                                      Marca não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {detailVehicle?.map((car, index) => (
                                          <CommandItem
                                            value={car?.codigo ?? undefined}
                                            key={index}
                                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                            onSelect={() => {
                                              handleSelectBrandVehicle()
                                              form.setValue(
                                                'id_brand',
                                                car?.codigo ?? '',
                                              )
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                car?.codigo === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {car?.nome}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_year"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCalendarCheck2 /> Ano Veículo
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      modeloAno !== undefined
                                        ? modeloAno?.find((corp) => {
                                            return corp?.codigo === field.value
                                          })?.nome
                                        : 'Selecione o ano do veículo'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando modelo Veículo..." />
                                    <CommandEmpty>
                                      Ano não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {modeloAno?.map((car, index) => (
                                          <CommandItem
                                            value={car?.codigo ?? undefined}
                                            key={index}
                                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                            onSelect={() => {
                                              handleSelectYearVehicle()
                                              form.setValue(
                                                'id_year',
                                                car?.codigo ?? '',
                                              )
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                car?.codigo === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {car?.nome}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="plate"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="plate"
                                className="flex items-center gap-1"
                              >
                                <LuSpellCheck2 /> Placa
                              </FormLabel>
                              <FormControl>
                                <InputMask
                                  {...field}
                                  id="plate"
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3
                                  py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent
                                  file:text-sm file:font-medium placeholder:text-muted-foreground
                                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                  disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="ABC9A99"
                                  mask="_______"
                                  replacement={{
                                    _: /[A-z0-9]/,
                                  }}
                                  onChange={(event) => {
                                    field.onChange(
                                      event.target.value.toUpperCase(),
                                    )
                                  }}
                                  autoCapitalize="none"
                                  autoComplete="name"
                                  autoCorrect="off"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="prefix"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="prefix"
                                className="flex items-center gap-1 "
                              >
                                <LuCaseUpper /> Prefixo
                              </FormLabel>
                              <FormControl>
                                <InputMask
                                  {...field}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3
                                  py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent
                                  file:text-sm file:font-medium placeholder:text-muted-foreground
                                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                  disabled:cursor-not-allowed disabled:opacity-50"
                                  id="prefix"
                                  placeholder="UR-99, ABT-01"
                                  mask="_________"
                                  replacement={{
                                    _: /^[A-Za-z0-9-]+$/,
                                  }}
                                  autoCapitalize="none"
                                  autoComplete="name"
                                  autoCorrect="off"
                                  onChange={(event) => {
                                    field.onChange(
                                      event.target.value.toUpperCase(),
                                    )
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="status"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCalendarCheck2 /> Status
                              </FormLabel>{' '}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between text-muted-foreground',
                                      )}
                                    >
                                      {field.value !== undefined
                                        ? status?.find((corp) => {
                                            return (
                                              +corp?.id_status === field.value
                                            )
                                          })?.status
                                        : 'Selecione o status do veículo'}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando status Veículo..." />
                                    <CommandEmpty>
                                      Ano não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {status?.map((car, index) => (
                                          <CommandItem
                                            value={car?.id_status ?? undefined}
                                            key={index}
                                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                            onSelect={() => {
                                              handleSelectYearVehicle()
                                              form.setValue(
                                                'status',
                                                +car?.id_status ?? '',
                                              )
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                +car?.id_status === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            {car?.status}
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
                  </div>
                </div>
              </div>
              {pending}
              <div className="flex w-full flex-col  justify-end  md:flex-row">
                <Button
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
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  )
}
export default VehicleCorporationForm
