'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FaBirthdayCake } from 'react-icons/fa'
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
import { LiaUserCogSolid } from 'react-icons/lia'
import {
  LuBuilding,
  LuBuilding2,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardEdit,
  LuFile,
  LuFolderEdit,
  LuMail,
  LuMailPlus,
  LuMailX,
  LuMessageSquarePlus,
  LuPlusCircle,
} from 'react-icons/lu'
import {
  MdOutlineManageAccounts,
  MdOutlineSupervisorAccount,
} from 'react-icons/md'

import {
  type AddressProps,
  type ResultUserRegistered,
  type Unidade,
} from '../../../../../../../types/index'

import { saveUserAction } from '@/app/actions/saveUserAction'
import { MyInputMask } from '@/components/Form/Input/myInputMask'
import { formatCep } from '@/functions/formatCep'
import { formatCpfCnpj } from '@/functions/formatCpfCnpj'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { getCep } from '@/lib/getCep'
import { cn } from '@/lib/utils'
import {
  type IRegisterUserSchema,
  RegisterUserSchema,
} from '@/schemas/RegisterUserSchema'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { Button, buttonVariants } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
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
import { Label } from '@/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Separator } from '@/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

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
  unidades: Unidade
  className?: string
  states: AddressProps[] | null
}

export const UnidadesForm = ({
  unidades,
  // eslint-disable-next-line react/prop-types
  className,
  states,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()

  const form = useForm<IRegisterUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nome: unidades.name,
      email: unidades.director.competence + ' - ' + unidades.director.name,
      cpf: formatCpfCnpj(unidades.cnpj),
      data_nascimento: '',
      telefone: unidades.phone,
      cep: formatCep(unidades.companyAddress.zipCode),
      endereco: unidades.companyAddress.address,
      numero: unidades.companyAddress.number,
      complemento: unidades.companyAddress.complement,
      estado: unidades.companyAddress.shortName,
      cidade: unidades.companyAddress.city,
      bairro: unidades.companyAddress.district,
      senha: '',
      confirmaSenha: '',
    },
  })

  const handleSubmit = (formData: IRegisterUserSchema): void => {
    console.log('teste')
    startTransition(async () => {
      const result: ResultUserRegistered = await saveUserAction(formData)
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
    <main className="grid flex-1 items-start">
      <Tabs defaultValue="dadosGerais">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="dadosGerais">Dados gerais</TabsTrigger>
            <TabsTrigger value="efetivo">Efetivo</TabsTrigger>
            <TabsTrigger value="viaturas">Viaturas</TabsTrigger>
            <TabsTrigger value="listaEscala">Escalas</TabsTrigger>
          </TabsList>
        </div>{' '}
        <TabsContent value="dadosGerais">
          <Card x-chunk="dashboard-06-chunk-0">
            <div className="flex items-center">
              <div className="flex w-full items-center justify-between gap-2 p-4 ">
                <h1 className="ml-4 mr-auto text-xl font-bold">Detalhes</h1>

                <div>
                  <Button size="sm" className="h-8 gap-1">
                    <LuFolderEdit className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Editar
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6 md:px-28 md:py-10">
              <Form {...form}>
                <form
                  /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                  onSubmit={form.handleSubmit(async (data) => {
                    handleSubmit(data)
                  })}
                  className="w-full space-y-4"
                >
                  <div className="grid h-full w-full grid-cols-12 ">
                    <div className="col-start-1 col-end-6 mr-4   hidden h-60 justify-center md:flex">
                      <Image
                        src={unidades.image}
                        width={500}
                        height={500}
                        quality={100}
                        alt="imagem director"
                        className=" rounded-[5px] object-cover"
                      />
                    </div>
                    <div className="col-start-1 col-end-13 flex h-full flex-col justify-evenly  md:col-start-6  ">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel
                              htmlFor="nome"
                              className="flex items-center gap-1"
                            >
                              <LuBuilding2 /> Unidade
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
                              <MdOutlineManageAccounts size={20} /> Comandante
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="email"
                                placeholder="Nome do Comandante"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
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
                              <MdOutlineSupervisorAccount size={20} />{' '}
                              SubComandante
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="email"
                                placeholder="Nome do SubComandante"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
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
                            <FaHashtag /> CNPJ
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
                                    field.value === '' &&
                                      'text-muted-foreground',
                                  )}
                                >
                                  {field.value !== ''
                                    ? states?.find(
                                        (state) =>
                                          state.shortName === field.value,
                                      )?.state
                                    : 'Selecione um Estado'}
                                  <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search language..." />
                                <CommandEmpty>
                                  Estado não encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  <CommandList>
                                    {states?.map((state, index) => (
                                      <CommandItem
                                        value={state.shortName}
                                        key={index}
                                        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                        onSelect={async () => {
                                          await handleCity(state.shortName)
                                          form.setValue(
                                            'estado',
                                            state.shortName,
                                          )
                                        }}
                                      >
                                        <LuCheck
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            state.shortName === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                        {state.state}
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
                                    field.value === '' &&
                                      'text-muted-foreground',
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
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Procurando cidade..." />
                                <CommandEmpty>
                                  Cidade não encontrada.
                                </CommandEmpty>
                                <CommandGroup>
                                  <CommandList>
                                    {arrayCitiesByState?.map((city, index) => (
                                      <CommandItem
                                        value={city.city}
                                        key={index}
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
                      Salvar
                    </Button>{' '}
                  </div>
                </form>
              </Form>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="efetivo">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="viaturas">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="listaEscala">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
export default UnidadesForm
