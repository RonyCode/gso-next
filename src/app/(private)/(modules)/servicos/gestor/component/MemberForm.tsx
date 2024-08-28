'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuCheck,
  LuChevronsUpDown,
  LuClipboardEdit,
  LuLandmark,
  LuLoader2,
  LuTrash2,
} from 'react-icons/lu'

import { saveUnidadeAction } from '@/app/(private)/(modules)/servicos/gestor/actions/saveUnidadeAction'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import {
  type ISaveMemberSchema,
  SaveMemberSchema,
} from '@/schemas/SaveMemberSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import type { AddressProps, UserType } from '@/types/index'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema[] | null
  users?: UserType[] | null
  className?: string
  states?: AddressProps[] | null
  params?: { id_company: string; name_corporation: string }
}

export const MemberForm = ({
  corporations,
  users,
  className,
  states,
  params,
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const [disabled, setDisabled] = React.useState(true)
  const [corpFound, setCorpFound] = React.useState({} as IOrganizacaoSchema)
  const [membersFiltered, setMembersFiltered] = React.useState(
    users as UserType,
  )
  const { data: session } = useSession()

  const router = useRouter()
  // useEffect(() => {
  //   startTransition(async () => {
  //     if (corporations?.address?.short_name != null) {
  //       await getAllCitiesByState(corporations?.address?.short_name);
  //     }
  //   });
  //   if (corporations?.address?.short_name == null) setDisabled(false);
  // }, [corporations?.address?.short_name, disabled]);

  const form = useForm<ISaveMemberSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(SaveMemberSchema),

    defaultValues: {
      id_company: null,
      id_corporation: null,
      id_user: null,
      excluded: 0,
    },
  })
  const handleSubmit = (formData: Partial<IUnidadeSchema>): void => {
    console.log(formData)
    // startTransition(async () => {
    //   const result = await saveUnidadeAction(formData)
    //   if (result?.code !== 202) {
    //     toast({
    //       variant: 'danger',
    //       title: 'Erro ao salvar corporations! 🤯 ',
    //       description: result?.message,
    //     })
    //   }
    //   if (result?.code === 202) {
    //     toast({
    //       variant: 'success',
    //       title: 'Ok! Unidade salva com sucesso! 🚀',
    //       description: 'Tudo certo corporations salva',
    //     })
    //     redirect(`/servico/corporations`)
    //   }
    // })
  }
  const handleDeleteAction = async (
    formData: IUnidadeSchema,
  ): Promise<void> => {
    formData.excluded = 1
    startTransition(async () => {
      const result = await saveUnidadeAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao deletar corporation! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! Unidade deletada com sucesso! 🚀',
          description: 'Tudo certo corporation deletada',
        })
        router.push(`/servicos/corporations`)
      }
    })
  }

  const handleSelectCorporation = async (
    corp: IOrganizacaoSchema,
  ): Promise<void> => {
    form.setValue('id_corporation', corp?.id)
    setCorpFound(corp)
    const tew = users?.find(
      (user) =>
        user?.id !==
          corp?.members?.find(
            (member) =>
              user?.id === member?.id_user && member?.id_user !== null,
          )?.id_user && corp.members?.length > 0,
    )

    setMembersFiltered(tew)
    console.log(membersFiltered)
  }

  const handleSelectCompany = async (
    company: IUnidadeSchema,
  ): Promise<void> => {
    form.setValue('id_company', company?.id ?? '')
  }

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4  space-y-2 p-6">
            <h1 className="ml-4 mr-auto text-xl font-bold">Detalhes</h1>
            {session?.role === 'admin' && (
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
                        ATENÇÂO!!! Tem certeza que deseja excluir esta
                        corporation de sua corporação?
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
                {/* <div className=" relative col-start-1 col-end-6   mr-4 hidden h-60 justify-center rounded-[8px] border border-muted-foreground/10 md:flex"> */}
                {/*   <Image */}
                {/*     src={ */}
                {/*       corporations.getValues('image') ?? */}
                {/*       process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png' */}
                {/*     } */}
                {/*     width={500} */}
                {/*     height={500} */}
                {/*     quality={100} */}
                {/*     alt="imagem director" */}
                {/*     className="rounded-[5px] object-contain" */}
                {/*   /> */}
                {/* </div> */}

                <div className="col-start-1 col-end-13 flex h-full flex-col justify-evenly  md:col-start-6  ">
                  <FormField
                    control={form.control}
                    name="id_corporation"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="id_corporation"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuLandmark /> Corporação
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
                                  ? corporations?.find((corp) => {
                                      return corp?.id === field.value
                                    })?.short_name_corp
                                  : 'Selecione uma corporação'}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procurando Estados..." />
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
                                      onSelect={async () => {
                                        await handleSelectCorporation(corp)
                                        form.setValue(
                                          'id_corporation',
                                          corp?.id,
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
                                      {corp.short_name_corp}
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
                    name="id_company"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="id_company"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuLandmark /> Unidade
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
                                  ? corpFound?.companies?.find(
                                      (company) =>
                                        company?._id?.$oid === field.value,
                                    )?.name
                                  : 'Selecione uma unidade'}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procurando Unidade..." />
                              <CommandEmpty>
                                Unidade não encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {corpFound?.companies?.map(
                                    (company, index) => (
                                      <CommandItem
                                        value={company?._id?.$oid}
                                        key={index}
                                        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                        onSelect={async () => {
                                          await handleSelectCompany(company)
                                          form.setValue(
                                            'id_company',
                                            company?._id?.$oid,
                                          )
                                        }}
                                      >
                                        <LuCheck
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            company?._id?.$oid === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                        {company.name}
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
                  <FormField
                    control={form.control}
                    name="id_user"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="id_cuser"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuLandmark /> Usuário
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
                                  ? users?.find((user) => {
                                      return (
                                        user?.id === field.value &&
                                        user?.id !==
                                          corpFound?.members?.find(
                                            (member) =>
                                              user?.id === member?.id_user &&
                                              member?.id_user !== null,
                                          )?.id_user &&
                                        corpFound?.members?.length > 0
                                      )
                                    })?.account?.name
                                  : 'Selecione um usuário'}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procurando Estados..." />
                              <CommandEmpty>
                                Usuário não encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {users?.map((user, index) => (
                                    <CommandItem
                                      value={user?.id}
                                      key={index}
                                      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                      onSelect={async () => {
                                        form.setValue('id_user', user?.id)
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          user?.id === field.value &&
                                            user?.id !==
                                              corpFound?.members?.find(
                                                (member) =>
                                                  user?.id ===
                                                    member?.id_user &&
                                                  member?.id_user !== null,
                                              )?.id_user &&
                                            corpFound?.members?.length > 0
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {'teste' + user?.account?.name}
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

              <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
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
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  )
}
export default MemberForm
