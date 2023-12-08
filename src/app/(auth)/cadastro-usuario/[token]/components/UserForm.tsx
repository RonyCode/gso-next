'use client'

import * as React from 'react'
import { useEffect, useTransition } from 'react'
import {
  FaBuildingColumns,
  FaCity,
  FaEnvelope,
  FaHashtag,
  FaMapLocationDot,
  FaPhone,
  FaSpinner,
  FaTreeCity,
  FaUser,
  FaUserLock,
} from 'react-icons/fa6'
import { useCep } from '@/hooks/useCep'

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
import { toast } from '@/ui/use-toast'
import { CepProps } from '@/types'
import LoadingPage from '@/components/Loadings/LoadingPage'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEstados } from '@/hooks/useEstados'
import { useEndereco } from '@/hooks/useEndereco'

enum Fields {
  nome = 'nome',
  email = 'email',
  cpf = 'cpf',
  data_nascimento = 'data_nascimento',
  telefone = 'telefone',
  cep = 'cep',
  endereco = 'endereco',
  numero = 'numero',
  bairro = 'bairro',
  cidade = 'cidade',
  estado = 'estado',
  senha = 'senha',
  confirmaSenha = 'confirmaSenha',
}

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>

export const UserForm = async ({
  className,
  ...props
}: UserRegisterFormProps) => {
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
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      senha: '',
      confirmaSenha: '',
    },
  })

  const { getEstados, findCep, getCidades } = useEndereco()

  const [pending, startTransition] = useTransition()
  const estados = await getEstados()
  const cidades = await getCidades(form.getValues().estado)

  console.log(form.getValues().estado)
  // useEffect(() => {
  //   if (estados) {
  //     console.log(estados)
  //   }
  // }, [])

  const handleSubmit = async (data: RegisterUserSchema) => {
    startTransition(async () => {
      const restult = await signedUpAction(data)
      // if (restult?.errors) {
      //   const arrayErrors = Object.entries(restult.errors)
      //   for (const error of arrayErrors) {
      //     chageValueInputError(error[0] as Fields, error[1])
      //   }
      // }
    })
  }

  const chageValueInput = (field: Fields, newValue: string) => {
    form.setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    form.clearErrors(field)
  }

  const handleCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value.length >= 9) {
      startTransition(async () => {
        const { street, city, district, stateShortname }: CepProps =
          await findCep(e?.target?.value)
        if (!city) {
          toast({
            variant: 'danger',
            title: 'Cep Incorreto! 🤯 ',
            description: 'Cep não encontrado',
          })
        }
        chageValueInput(Fields.endereco, street)
        chageValueInput(Fields.cidade, city)
        chageValueInput(Fields.bairro, district)
        chageValueInput(Fields.estado, stateShortname)
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
              await handleSubmit(data)
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
            </div>
            <div className="flex w-full flex-col  gap-2 md:flex-row">
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="estado"
                      className="flex items-center gap-1"
                    >
                      <FaBuildingColumns /> Estado
                    </FormLabel>{' '}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um Estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Selecione</SelectLabel>

                          {estados?.result?.map((state) => (
                            <SelectItem
                              key={state.abbreviation}
                              value={state.shortName}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="cidade"
                      className="flex items-center gap-1"
                    >
                      <FaBuildingColumns /> Cidade
                    </FormLabel>{' '}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma Cidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Selecione</SelectLabel>

                          {estados?.result?.map((state) => (
                            <SelectItem
                              key={state.shortName}
                              value={state.shortName}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
