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

import { saveCorporationAction } from '@/app/(private)/servicos/organizacao/actions/saveCorporationAction'
import { EditPhoto } from '@/components/EditPhoto/EditPhoto'
import { MyInputMask } from '@/components/Form/Input/myInputMask'
import LoadingPage from '@/components/Loadings/LoadingPage'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

enum Fields {
  address = 'address',
  district = 'district',
  city = 'city',
  shortName = 'short_name',
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
  const [disabled, setDisabled] = React.useState(true)
  const router = useRouter()

  useEffect(() => {
    startTransition(async () => {
      if (organizacao?.short_name != null) {
        await getAllCitiesByState(organizacao?.short_name)
      }
    })
    if (organizacao?.short_name == null) setDisabled(false)
  }, [organizacao?.short_name, disabled])

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
      address: organizacao?.address ?? '',
      number: organizacao?.number ?? '',
      zipcode: maskZipcode(organizacao?.zipcode) ?? '',
      complement: organizacao?.complement ?? '',
      district: organizacao?.district ?? '',
      city: organizacao?.city ?? '',
      short_name: organizacao?.short_name ?? '',
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

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-2 p-4 ">
            <h1 className="ml-4 mr-auto text-xl font-bold">Detalhes</h1>
            {organizacao?.id != null && (
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
                      <DialogTitle>Excluir Unidade</DialogTitle>
                      <DialogDescription>
                        Está ação precisa ser confirmada
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p>
                        {' '}
                        ATENÇÂO!!! Tem certeza que deseja excluir esta unidade
                        de sua corporação?
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
                          <LuBuilding2 /> Organização
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Digite nome da organização"
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
                          <LuBuilding2 /> Sigla Organização
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="short_name_corp"
                            placeholder="Digite sigla da organização"
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
                  name="zipcode"
                  render={({ field }) => (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <FormItem onChange={handleCep}>
                      <FormLabel
                        htmlFor="zipcode"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> Cep
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="zipcode"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="address"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuMapPin /> Endereco
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="address"
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
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="number"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> Numero
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="number"
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
                  name="complement"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="complement"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuScrollText /> Complemento
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="complement"
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
                  name="short_name"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="short_name"
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
                                    (state) => state.shortName === field.value,
                                  )?.state
                                : 'Selecione um Estado'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>Estado não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={state.shortName}
                                    key={index}
                                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                    onSelect={async () => {
                                      await handleCity(state.shortName)
                                      form.setValue(
                                        'short_name',
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
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="companyAddress.city"
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
                                    (city) => city.city === field.value,
                                  )?.city
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
                                    value={city.city}
                                    key={index}
                                    onSelect={() => {
                                      form.setValue('city', city.city)
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
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="district"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuFlag /> Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="district"
                          placeholder="Digite seu bairro"
                          autoCapitalize="none"
                          autoComplete="district"
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
        </div>
      </Card>
    </>
  )
}
export default OrganizacaoForm
