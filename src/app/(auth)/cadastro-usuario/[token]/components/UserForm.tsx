'use client'

import * as React from 'react'
import { use, useState, useTransition } from 'react'
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

import { signedUpAction } from '../actions/signedUpAction'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Button, buttonVariants } from '@/ui/button'
import { useForm } from 'react-hook-form'
import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Input } from '@/ui/input'
import { MyInputMask } from '@/components/ui/myInputMask'
import { FaBirthdayCake } from 'react-icons/fa'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { getAllStates } from '@/lib/getAllStates'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { getCep } from '@/lib/getCep'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { AddressProps } from '../../../../../../types'
import { toast } from '@/ui/use-toast'
import { redirect } from 'next/navigation'

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

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>
// CHAMA O FETCH FORA DO COMPONENTE PARA NAO RE - RENDERIZAR LOOP INFINITO

export async function generateStaticParams() {
  const getEstates = await getAllStates()
  return getEstates.map((item) => ({ state: item }))
}
const getEstates = getAllStates()

export const UserForm = ({ className, ...props }: UserRegisterFormProps) => {
  const form = useForm<RegisterUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      data_nascimento: '',
      telefone: '',
      cep: '',
      endereco: '',
      complemento: '',
      sigla: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      senha: '',
      confirmaSenha: '',
    },
  })

  const [pending, startTransition] = useTransition()
  const [arrayCitiesByState, setArrayCitiesByState] = useState<AddressProps[]>(
    [],
  )

  const states = use(getEstates)

  const handleSubmit = (data: RegisterUserSchema) => {
    startTransition(async () => {
      const restult = await signedUpAction(data)
      if (!restult?.id) {
        toast({
          variant: 'danger',
          title: 'Erro ao cadastrar usuário! 🤯 ',
          description: restult?.message,
        })
      }
      if (restult?.id) {
        toast({
          variant: 'success',
          title: 'Ok! Usuário Cadastrado! 🤯 ',
          description: 'Tudo certo usuário cadastrado',
        })
        redirect('/auth')
      }
    })
  }

  const chageValueInput = async (field: Fields, newValue: string) => {
    form.setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    if (field === Fields.estado) await handleCity(newValue)
    form.clearErrors(field)
  }
  async function handleCity(value: string) {
    const arrayCities = await getAllCitiesByState(value)
    setArrayCitiesByState(arrayCities)
  }

  const handleCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value.length >= 9) {
      startTransition(async () => {
        const { street, city, district, stateShortname } = await getCep(
          e.target?.value,
        )
        await chageValueInput(Fields.endereco, street)
        await chageValueInput(Fields.sigla, stateShortname)
        await chageValueInput(Fields.cidade, city)
        await chageValueInput(Fields.bairro, district)
        await chageValueInput(Fields.estado, stateShortname)
        if (!city) {
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
    <div className=" container flex w-full flex-col py-16 md:w-9/12">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Cadastro</h1>
        <p className="text-sm text-muted-foreground">
          Complete o cadastro observe os campos obrigatórios
        </p>
      </div>

      <div className={cn('mt-4 grid gap-6 py-16', className)} {...props}>
        <LoadingPage pending={pending} />
        <Form {...form}>
          <form
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
                  <FormItem>
                    <FormLabel
                      htmlFor="data_nascimento"
                      className="flex items-center gap-1"
                    >
                      <FaBirthdayCake />
                      Nascimento
                    </FormLabel>
                    <FormControl>
                      <MyInputMask
                        {...field}
                        id="data_nascimento"
                        placeholder="00/00/0000"
                        mask="__/__/____"
                        autoCapitalize="none"
                        autoComplete="data_nascimento"
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
                        type="text"
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
                      htmlFor="cidade"
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
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? states.find(
                                  (state) => state.shortName === field.value,
                                )?.state
                              : 'Selecione um Estado'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandEmpty>Estado não encontrado.</CommandEmpty>
                          <CommandGroup>
                            {states.map((state) => (
                              <CommandItem
                                value={state.shortName}
                                key={state.id}
                                onSelect={() => {
                                  handleCity(state.shortName)
                                  form.setValue('estado', state.shortName)
                                }}
                              >
                                <Check
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
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? arrayCitiesByState.find(
                                  (city) => city.city === field.value,
                                )?.city
                              : 'Selecione uma Cidade'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Procurando cidade..." />
                          <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                          <CommandGroup>
                            {arrayCitiesByState.map((city) => (
                              <CommandItem
                                value={city.city}
                                key={city.id}
                                onSelect={() => {
                                  form.setValue('cidade', city.city)
                                }}
                              >
                                <Check
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
                      htmlFor="senha"
                      className="flex items-center gap-1"
                    >
                      <FaUserLock /> Senha
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
              <div className="mt-[1.380rem] w-5/12 gap-1">
                <Button
                  disabled={pending}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    ' w-full',
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
  )
}
