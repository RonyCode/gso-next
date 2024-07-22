'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import * as React from 'react'
import { useEffect, useTransition } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import {
  FaBuildingColumns,
  FaHashtag,
  FaMapLocationDot,
  FaPhone,
  FaSpinner,
  FaTreeCity,
  FaUser,
} from 'react-icons/fa6'
import { LuCheck, LuChevronsUpDown } from 'react-icons/lu'

import { saveUserAction } from '@/app/actions/saveUserAction'
import { EditPhoto } from '@/components/EditPhoto/EditPhoto'
import { MyInputMask } from '@/components/Form/Input/myInputMask'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { maskCpfCnpj } from '@/functions/masks/maskCpfCnpj'
import { maskPhone } from '@/functions/masks/maskphone'
import { maskZipcode } from '@/functions/masks/maskZipcode'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { getCep } from '@/lib/getCep'
import { cn } from '@/lib/utils'
import { EditUserSchema, type IEditUserSchema } from '@/schemas/EditUserSchema'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { type AddressProps, type UserType } from '@/types/index'
import { Button, buttonVariants } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
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
import { Input } from '@/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import moment from 'moment'

enum Fields {
  cep = 'cep',
  endereco = 'endereco',
  sigla = 'sigla',
  bairro = 'bairro',
  cidade = 'cidade',
  estado = 'estado',
  id = 'id',
  nome = 'nome',
  image = 'image',
  email = 'email',
  cpf = 'cpf',
}

type UserRegisterFormProps = {
  user: UserType
  states: AddressProps[] | null
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export const EditProfileForm = ({
  user,
  states,
  className,
  ...props
}: UserRegisterFormProps): React.ReactElement => {
  const [pending, startTransition] = useTransition()
  const { update, data: session } = useSession()
  const router = useRouter()
  let defaultValues = {}

  useEffect(() => {
    startTransition(async () => {
      if (user?.address?.state != null) {
        await getAllCitiesByState(user?.address?.state)
      }
    })
  }, [user?.address?.state])

  if (user?.account?.name !== 'user-external') {
    defaultValues = {
      id: user?.id?.toString(),
      nome: user?.account?.name,
      image: user?.account?.image,
      email: user?.userAuth?.email,
      cpf: maskCpfCnpj(user?.account?.cpf),
      data_nascimento: moment(user?.account?.birthday).format('DD/MM/yyyy'),
      telefone: maskPhone(user?.account?.phone),
      cep: maskZipcode(user?.address?.zipCode ?? ''),
      endereco: user?.address?.address,
      complemento: user?.address?.complement,
      sigla: user?.address?.state,
      numero: user?.address?.number,
      bairro: user?.address?.district,
      estado: user?.address?.state,
      cidade: user?.address?.city,
    }
  }

  const form = useForm<IEditUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(EditUserSchema),
    defaultValues,
  })

  const handleSubmit = (dataForm: IEditUserSchema): void => {
    startTransition(async () => {
      const { data, message } = await saveUserAction(dataForm)
      if (data?.id == null) {
        toast({
          variant: 'danger',
          title: 'Erro ao cadastrar usuário! 🤯 ',
          description: message,
        })
      }
      if (data?.id != null) {
        toast({
          variant: 'success',
          title: 'Ok! Usuário Atualizado! 🤯 ',
          description: 'Tudo certo usuário atualizado',
        })

        await update({
          ...user,
          name: dataForm?.nome,
          image: dataForm?.image,
        })
        router.refresh()

        redirect('/conta')
      }
    })
  }

  async function handleCity(value: string): Promise<AddressProps[]> {
    return await getAllCitiesByState(value)
  }

  const chageValueInput = async (
    field: Fields,
    newValue: string,
  ): Promise<void> => {
    form.setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    if (field === Fields.estado) await handleCity(newValue)
    form.clearErrors(field)
  }

  let arrayCitiesByState: AddressProps[] = []
  arrayCitiesByState = cityStore().cities

  const handleCep = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e?.target?.value.length >= 9) {
      startTransition(async () => {
        const { logradouro, localidade, uf, bairro } = await getCep(
          e.target?.value,
        )
        await chageValueInput(Fields.endereco, logradouro)
        await chageValueInput(Fields.sigla, uf)
        await chageValueInput(Fields.cidade, localidade)
        await chageValueInput(Fields.bairro, bairro)
        await chageValueInput(Fields.estado, uf)
        if (localidade === '') {
          states = []
          arrayCitiesByState = []
          toast({
            variant: 'danger',
            title: 'Cep Incorreto! 🤯 ',
            description: 'Cep não encontrado',
          })
        }
      })
    }
  }

  return (
    <>
      <div className="px-4 2xl:px-20">
        <div className={cn(' grid w-full p-4  lg:pt-12', className)} {...props}>
          <LoadingPage pending={pending} />
          <Form {...form}>
            <form
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onSubmit={form.handleSubmit(async (data) => {
                handleSubmit(data)
              })}
              className="w-full space-y-4"
            >
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <div className=" relative  mr-4  h-60 w-full justify-center md:flex md:w-6/12">
                  <div className="absolute -left-3 -top-3 z-100">
                    <EditPhoto
                      disabled={false}
                      directoryFile={form.getValues('image') ?? ''}
                      updateFormExternal={form as unknown as UseFormReturn}
                    />
                  </div>
                  <Image
                    src={
                      form.getValues('image') ??
                      session?.image ??
                      user?.account?.image ??
                      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
                    }
                    fill
                    quality={100}
                    alt="imagem director"
                    className="aspect-square  rounded-[5px] object-cover"
                  />
                </div>
                <div className=" w-full">
                  <div className="flex w-full flex-col  gap-2 md:flex-row">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="nome"
                            className="flex items-center gap-1"
                          >
                            <FaUser /> Nome
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="nome"
                              placeholder="Digite seu nome"
                              autoCapitalize="none"
                              autoComplete="nome"
                              autoCorrect="off"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-col  gap-2 md:flex-row">
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="cpf"
                            className="flex items-center gap-1"
                          >
                            <FaHashtag /> CPF
                          </FormLabel>
                          <FormControl>
                            <MyInputMask
                              className={cn(
                                'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                                className,
                              )}
                              {...field}
                              id="cpf"
                              placeholder="000.000.000-00"
                              mask="___.___.___-__"
                              autoCapitalize="none"
                              autoCorrect="on"
                              autoComplete="one-time-code"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="data_nascimento"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de nascimento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'min-w-[240px] pl-3 text-left font-normal',
                                    field.value.toString() === '' &&
                                      'text-muted-foreground',
                                  )}
                                >
                                  {field.value.toString() !== '' ? (
                                    format(field.value, 'dd/MM/yyyy')
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                onSelect={(date) => {
                                  if (date == null) return
                                  field.onChange(format(date, 'dd/MM/yyyy'))
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="telefone"
                            className="flex items-center gap-1"
                          >
                            <FaPhone /> Telefone
                          </FormLabel>
                          <FormControl>
                            <MyInputMask
                              {...field}
                              id="telefone"
                              placeholder="(00) 00000-0000"
                              mask="(__) _____-____"
                              autoCapitalize="none"
                              autoComplete="telefone"
                              autoCorrect="off"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <FormItem onChange={handleCep}>
                      <FormLabel
                        htmlFor="cep"
                        className="flex items-center gap-1"
                      >
                        <FaHashtag /> Cep
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="cep"
                          placeholder="00000-000"
                          mask="_____-___"
                          autoCapitalize="none"
                          autoComplete="cep"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="endereco"
                        className="flex items-center gap-1"
                      >
                        <FaMapLocationDot width={16} /> Endereco
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="endereco"
                          placeholder="Digite seu endereço"
                          autoCapitalize="none"
                          autoComplete="endereco"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="estado"
                        className="flex items-center gap-1"
                      >
                        <FaBuildingColumns /> Estado
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                field.value === '' && 'text-muted-foreground',
                              )}
                            >
                              {field.value !== ''
                                ? states?.find(
                                    (state) => state.short_name === field.value,
                                  )?.state
                                : 'Selecione um Estado'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandList>
                              <CommandInput placeholder="Buscar Estado..." />
                              <CommandEmpty>
                                Estado não encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    value={state.short_name}
                                    key={index + 1}
                                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                    onSelect={async () => {
                                      await handleCity(state.short_name)
                                      form.setValue('estado', state.short_name)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        state?.short_name === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {state?.state}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="cidade"
                        className="flex items-center gap-1"
                      >
                        <FaBuildingColumns /> Cidade
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                field.value === '' && 'text-muted-foreground',
                              )}
                            >
                              {field.value !== ''
                                ? arrayCitiesByState?.find(
                                    (city) => city.city === field.value,
                                  )?.city
                                : 'Selecione uma Cidade'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandList>
                              <CommandInput placeholder="Procurando cidade..." />
                              <CommandEmpty>
                                Cidade não encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                {arrayCitiesByState?.map((city, index) => (
                                  <CommandItem
                                    value={city.city}
                                    key={index + 1}
                                    onSelect={() => {
                                      form.setValue('cidade', city.city)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        city.city === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {city.city}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bairro"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="bairro"
                        className="flex items-center gap-1"
                      >
                        <FaTreeCity /> Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="bairro"
                          placeholder="Bairro"
                          autoCapitalize="none"
                          autoComplete="bairro"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-5/12">
                      <FormLabel
                        htmlFor="numero"
                        className="flex items-center gap-1"
                      >
                        <FaHashtag /> Numero
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="numero"
                          placeholder="Digite o numero da casa"
                          autoCapitalize="none"
                          autoComplete="numero"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complemento"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="complemento"
                        className="flex items-center gap-1"
                      >
                        <FaHashtag /> Complemento
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="complemento"
                          placeholder="Digite ponto de referência"
                          autoComplete="complemento"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" mb-4 mt-2 w-full lg:mt-[1.380rem] lg:w-3/12 lg:gap-1">
                  <Button
                    disabled={pending || !form.formState.isValid}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      ' w-full ',
                    )}
                    type="submit"
                  >
                    {pending && (
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Salvar
                  </Button>{' '}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
