'use client'

import * as React from 'react'
import { useState, useTransition } from 'react'
import {
  FaBuildingColumns,
  FaHashtag,
  FaMapLocationDot,
  FaPhone,
  FaSpinner,
  FaTreeCity,
  FaUser,
} from 'react-icons/fa6'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Input } from '@/ui/input'
import { MyInputMask } from '@/components/ui/myInputMask'
import { FaBirthdayCake } from 'react-icons/fa'
import LoadingPage from '@/components/Loadings/LoadingPage'
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
  CommandList,
} from '@/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { getCep } from '@/lib/getCep'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { toast } from '@/ui/use-toast'
import { redirect } from 'next/navigation'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { signedUpAction } from '@/app/(auth)/cadastro-usuario/[token]/actions/signedUpAction'
import { EditUserSchema } from '@/schemas/EditUserSchema'
import moment from 'moment'
import { AddressProps, UserType } from '../../../../../../types/index'

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
  user: UserType | null
  states: AddressProps[] | null
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export const EditProfileForm = ({
  user,
  states,
  className,
  ...props
}: UserRegisterFormProps) => {
  const [pending, startTransition] = useTransition()

  const defaultValues = {
    id: user?.id.toString() || '',
    nome: user?.account?.name || '',
    image: user?.account?.image || '',
    email: user?.userAuth?.email || '',
    cpf: user?.account?.cpf || '',
    data_nascimento: moment(user?.account?.birthday).format('DD/MM/yyyy') || '',
    telefone: user?.account?.phone || '',
    cep: user?.address?.zipCode || '',
    endereco: user?.address?.address || '',
    complemento: user?.address?.complement || '',
    sigla: user?.address?.shortName || '',
    numero: user?.address?.number || '',
    bairro: user?.address?.district || '',
    cidade: user?.address?.city || '',
    estado: user?.address?.state || '',
  }

  const form = useForm<EditUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(EditUserSchema),
    defaultValues: defaultValues as Partial<EditUserSchema>,
  })

  const handleSubmit = (data: EditUserSchema) => {
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
        redirect('/profile')
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
    await getAllCitiesByState(value)
  }
  let arrayCitiesByState = cityStore().cities

  const handleCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!localidade) {
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

  console.log(form.control._formState.errors)
  return (
    <>
      <div className=" mb-48 ">
        <div className="flex flex-col space-y-2 text-center">
          <span className="mb-4 text-2xl font-semibold tracking-tight">
            Preencha os campos
          </span>
        </div>

        <div
          className={cn(' grid place-items-center pt-4  lg:pt-12', className)}
          {...props}
        >
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
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? states?.find(
                                    (state) => state.shortName === field.value,
                                  )?.state
                                : 'Selecione um Estado'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                {states?.map((state) => (
                                  <CommandItem
                                    value={state.state}
                                    key={state.id}
                                    onSelect={() => {
                                      handleCity(state.shortName)
                                      form.setValue('estado', state.shortName)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        state?.shortName === field?.value
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
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? arrayCitiesByState?.find(
                                    (city) => city.city === field.value,
                                  )?.city
                                : 'Selecione uma Cidade'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                {arrayCitiesByState?.map((city) => (
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
                    disabled={false}
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
