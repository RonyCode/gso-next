'use client'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuBuilding2,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardEdit,
  LuFlag,
  LuGlobe2,
  LuHash,
  LuLandmark,
  LuLoader2,
  LuMapPin,
  LuPhone,
  LuScrollText,
  LuTrash2,
} from 'react-icons/lu'

import { saveCorporationAction } from '@/app/(private)/(modules)/servicos/gestor/actions/saveCorporationAction'
import { EditPhoto } from '@/components/EditPhoto/EditPhoto'
import { MyInputMask } from '@/components/Form/Input/myInputMask'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { maskCpfCnpj } from '@/functions/masks/maskCpfCnpj'
import { maskPhone } from '@/functions/masks/maskphone'
import { maskZipcode } from '@/functions/masks/maskZipcode'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { getCep } from '@/lib/getCep'
import { cn } from '@/lib/utils'
import {
  type IOrganizacaoSchema,
  OrganizacaoSchema,
} from '@/schemas/OrganizacaoSchema'
import { cityStore } from '@/stores/Address/CityByStateStore'
import type { AddressProps } from '@/types/index'
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
import { useSession } from 'next-auth/react'

enum Fields {
  address = 'address.address',
  district = 'address.district',
  city = 'address.city',
  shortName = 'address.short_name',
}

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  organizacao?: IOrganizacaoSchema | null
  className?: string
  states?: AddressProps[] | null
}

export const OrganizacaoForm = ({
                                  organizacao,
                                  className,
                                  states,
                                }: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const { data:session } = useSession();
  const [disabled, setDisabled] = React.useState(true)
  const router = useRouter()

  useEffect(() => {
    startTransition(async () => {
      if (organizacao?.address?.short_name != null) {
        await getAllCitiesByState(organizacao?.address?.short_name)
      }
    })
    if (organizacao?.address?.short_name == null) setDisabled(false)
  }, [organizacao?.address?.short_name, disabled])

  const form = useForm<Partial<IOrganizacaoSchema>>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(OrganizacaoSchema),
    defaultValues: {
      id: organizacao?.id ?? null,
      name: organizacao?.name ?? '',
      short_name_corp: organizacao?.short_name_corp ?? '',
      cnpj: maskCpfCnpj(organizacao?.cnpj) ?? '',
      phone: maskPhone(organizacao?.phone) ?? '',
      image: organizacao?.image ?? '',
      address: {
        address: organizacao?.address?.address ?? '',
        number: organizacao?.address?.number ?? '',
        zipcode: maskZipcode(organizacao?.address?.zipcode) ?? '',
        complement: organizacao?.address?.complement ?? '',
        district: organizacao?.address?.district ?? '',
        city: organizacao?.address?.city ?? '',
        short_name: organizacao?.address?.short_name ?? '',
        sigla: organizacao?.address?.short_name ?? '',
      },
      excluded: 0,
    },
  })
  const handleSubmit = (formData: Partial<IOrganizacaoSchema>): void => {
    startTransition(async () => {
      const result = await saveCorporationAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao salvar organização! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! organização salva com sucesso! 🚀',
          description: 'Tudo certo organização salva',
        })
        redirect(`/servicos/organizacao`)
      }
    })
  }
  const handleDeleteAction = async (
    formData: Partial<IOrganizacaoSchema>,
  ): Promise<void> => {
    formData.excluded = 1

    startTransition(async () => {
      const result = await saveCorporationAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao deletar organização! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! organização deletada com sucesso! 🚀',
          description: 'Tudo certo organização deletada',
        })
        router.push(`/servicos/organizacao`)
      }
    })
  }

  const chageValueInput = async (
    field: Partial<Fields>,
    newValue: string,
  ): Promise<void> => {
    form.setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    if (field === Fields.shortName) await handleCity(newValue)
    form.clearErrors(field)
  }

  async function handleCity(value: string): Promise<void> {
    await getAllCitiesByState(value)
  }

  let arrayCitiesByState = cityStore().cities

  const handleCep = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e?.target?.value.length >= 9) {
      startTransition(async () => {
        const { logradouro, localidade, uf, bairro } = await getCep(
          e.target?.value,
        )

        if (localidade === '' || localidade === undefined) {
          states = []
          arrayCitiesByState = []
          toast({
            variant: 'danger',
            title: 'Cep Incorreto! 🤯 ',
            description: 'Cep não encontrado',
          })
          return
        }
        await chageValueInput(Fields.address, logradouro)
        await chageValueInput(Fields.shortName, uf)
        await chageValueInput(Fields.city, localidade)
        await chageValueInput(Fields.district, bairro)
      })
    }
  }
  console.log(session?.role)

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-2 p-4 ">
            <h1 className="ml-4 mr-auto text-xl font-bold">Detalhes</h1>
            {organizacao?.id != undefined || session?.role === 'admin' && (
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
                      <DialogTitle>Excluir Corporação</DialogTitle>
                      <DialogDescription>
                        Está ação precisa ser confirmada
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p>
                        {' '}
                        ATENÇÂO!!! Tem certeza que deseja excluir esta Corporação?
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
        <div className="my-8 p-6 md:px-28 md:py-10">
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
                <div className=" relative col-start-1 col-end-6   mr-4 hidden h-60 justify-center md:flex">
                  <div className="absolute -left-3 -top-3">
                    <EditPhoto
                      disabled={disabled}
                      directoryFile={form.getValues('image')}
                      updateFormExternal={form}
                    />
                  </div>
                  <Image
                    src={form.getValues('image') ?? ''}
                    width={500}
                    height={500}
                    quality={100}
                    alt="imagem director"
                    className="rounded-[5px] object-cover"
                  />
                </div>

                <div className="col-start-1 col-end-13 flex h-full flex-col justify-evenly  md:col-start-6  ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel
                          htmlFor="name"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuBuilding2 /> Corporação
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Digite nome da Corporação"
                            autoCapitalize="none"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="short_name_corp"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel
                          htmlFor="short_name_corp"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuBuilding2 /> Sigla Corporação
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="short_name_corp"
                            placeholder="Digite sigla da Corporação"
                            autoCapitalize="none"
                            autoComplete="short_name_corp"
                            autoCorrect="off"
                            disabled={disabled}
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
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="cnpj"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> CNPJ
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                            className,
                          )}
                          {...field}
                          id="cnpj"
                          placeholder="000.000.000-00"
                          mask="__.___.___/____-__"
                          autoCapitalize="none"
                          autoComplete="cnpj"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="phone"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuPhone /> Telefone
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="phone"
                          placeholder="(00) 00000-0000"
                          mask="(__) _____-____"
                          autoCapitalize="none"
                          autoComplete="phone"
                          autoCorrect="off"
                          disabled={disabled}
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
                  name="address.zipcode"
                  render={({ field }) => (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <FormItem onChange={handleCep}>
                      <FormLabel
                        htmlFor="address.zipcode"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> Cep
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="address.zipcode"
                          placeholder="00000-000"
                          mask="_____-___"
                          autoCapitalize="none"
                          autoComplete="zipcode"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="address.address"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuMapPin /> Endereco
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="address.address"
                          placeholder="Digite seu endereço"
                          autoCapitalize="none"
                          autoComplete="address"
                          autoCorrect="off"
                          disabled={disabled}
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
                  name="address.number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="address.number"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> Numero
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="address.number"
                          placeholder="Digite o numero da casa"
                          autoCapitalize="none"
                          autoComplete="number"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.complement"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="address.complement"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuScrollText /> Complemento
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="address.complement"
                          placeholder="Digite ponto de referência"
                          autoComplete="complement"
                          disabled={disabled}
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
                  name="address.short_name"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="address.short_name"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuLandmark /> Estado
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
                                ? states?.find(
                                  (state) => state.sigla === field.value,
                                )?.nome
                                : 'Selecione um Estado'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando Estado..." />
                            <CommandEmpty>Estado não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={state.sigla}
                                    key={index}
                                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                    onSelect={async () => {
                                      await handleCity(state.sigla)
                                      form.setValue('address.short_name', state.sigla)
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
                  name="address.city"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="address.city"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuGlobe2 /> Cidade
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
                              {field.value !== ''
                                ? arrayCitiesByState?.find(
                                  (city) => city.nome === field.value,
                                )?.nome
                                : 'Selecione uma Cidade'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando cidade..." />
                            <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {arrayCitiesByState?.map((city, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={city.nome}
                                    key={index}
                                    onSelect={() => {
                                      form.setValue('address.city', city.nome)
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
                  name="address.district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="address.district"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuFlag /> Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="address.district"
                          placeholder="Digite seu bairro"
                          autoCapitalize="none"
                          autoComplete="address.district"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
                {!disabled  &&  session?.role === 'admin'&&(
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
        </div>
      </Card>
    </>
  )
}
export default OrganizacaoForm
