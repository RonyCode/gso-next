'use client'

import { redirect } from 'next/navigation'
import * as React from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaBuildingColumns,
  FaEnvelope,
  FaHashtag,
  FaMapLocationDot,
  FaPhone,
  FaSpinner,
  FaTreeCity,
  FaUser,
  FaUserLock,
} from 'react-icons/fa6'
import { LuCheck, LuChevronsUpDown } from 'react-icons/lu'

import { saveUserAction } from '@/app/actions/saveUserAction'
import { MyInputMask } from '@/components/Form/Input/myInputMask'
import LoadingPage from '@/components/Loadings/LoadingPage'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { getCep } from '@/lib/getCep'
import { cn } from '@/lib/utils'
import {
  type IRegisterUserSchema,
  RegisterUserSchema,
} from '@/schemas/RegisterUserSchema'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { type AddressProps, type ResultUserRegistered } from '@/types/index'
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
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

enum Fields {
  email = 'email',
  cep = 'cep',
  endereco = 'endereco',
  sigla = 'sigla',
  bairro = 'bairro',
  cidade = 'cidade',
  estado = 'estado',
  senha = 'senha',
  confirmaSenha = 'confirmaSenha',
}

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  params: string
  states: AddressProps[] | null
}

// CHAMA O FETCH FORA DO COMPONENTE PARA NAO RE - RENDERIZAR LOOP INFINITO
// INITIALIZE STATES

export const UserRegisterForm = ({
  params,
  states,
  // eslint-disable-next-line react/prop-types
  className,
  ...props
}: UserRegisterFormProps): React.ReactElement => {
  const form = useForm<IRegisterUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nome: '',
      email: params,
      cpf: '',
      data_nascimento: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      estado: '',
      cidade: '',
      bairro: '',
      senha: '',
      confirmaSenha: '',
    },
  })

  const [pending, startTransition] = useTransition()

  const [date, setDate] = React.useState<Date>()

  const handleSubmit = (formData: IRegisterUserSchema): void => {
    startTransition(async () => {
      const result: ResultUserRegistered = await saveUserAction(formData)

      console.log(JSON.stringify(form.getValues()))
      if (result?.data?.id == null) {
        toast({
          variant: 'danger',
          title: 'Erro ao cadastrar usuário! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.data?.id != null) {
        toast({
          variant: 'success',
          title: 'Ok! Usuário Cadastrado! 🤯 ',
          description: 'Tudo certo usuário cadastrado',
        })
        redirect('/auth')
      }
    })
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

  async function handleCity(value: string): Promise<void> {
    await getAllCitiesByState(value)
  }

  // let states = stateStore().states
  let arrayCitiesByState = cityStore().cities

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
      <div className="  flex  h-full  flex-col ">
        <div className="flex flex-col space-y-2 text-center">
          <span className="text-2xl font-semibold tracking-tight">
            Cadastro
          </span>
          <p className="text-sm text-muted-foreground ">
            Complete o cadastro observe os campos obrigatórios
          </p>
        </div>

        <div
          className={cn(' grid place-items-center pt-4  lg:pt-12', className)}
          {...props}
        >
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="email"
                        className="flex items-center gap-1"
                      >
                        <FaEnvelope /> Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          placeholder="email@exemplo.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={true}
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
                          autoComplete="cpf"
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
                                field.value
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            captionLayout="dropdown-buttons"
                            locale={ptBR}
                            toYear={2100}
                            fromYear={1900}
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                              if (date == null) return
                              setDate(date)
                              field.onChange(format(date, 'dd/MM/yyyy'))
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
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
                  name="numero"
                  render={({ field }) => (
                    <FormItem>
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
                                    (state) => state.sigla === field.value,
                                  )?.nome
                                : 'Selecione um Estado'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>Estado não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    value={state.sigla}
                                    key={index}
                                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                    onSelect={async () => {
                                      await handleCity(state.sigla)
                                      form.setValue('estado', state.sigla)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        state.sigla === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {state.nome}
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
                                    (city) => city.nome === field.value,
                                  )?.nome
                                : 'Selecione uma Cidade'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando cidade..." />
                            <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {arrayCitiesByState?.map((city, index) => (
                                  <CommandItem
                                    value={city.nome}
                                    key={index}
                                    onSelect={() => {
                                      form.setValue('cidade', city.nome)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        city.nome === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {city.nome}
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
                          placeholder="bairro"
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
              <div className="flex w-full flex-col  justify-center gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="senha"
                        className="flex items-center gap-1"
                      >
                        <FaUserLock /> Senha
                      </FormLabel>{' '}
                      <FormControl>
                        <Input
                          {...field}
                          id="senha"
                          placeholder="******"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="senha"
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
                  name="confirmaSenha"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="confirmaSenha"
                        className="flex items-center gap-1"
                      >
                        <FaUserLock /> Repita senha
                      </FormLabel>{' '}
                      <FormControl>
                        <Input
                          {...field}
                          id="confirmaSenha"
                          placeholder="******"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="confirmaSenha"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" mb-4 mt-2 w-full lg:mt-[1.380rem] lg:w-5/12 lg:gap-1">
                  <Button
                    disabled={pending}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      ' w-full ',
                    )}
                    type="submit"
                  >
                    {pending && (
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Cadastrar
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
