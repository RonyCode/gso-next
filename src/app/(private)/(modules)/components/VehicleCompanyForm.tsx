'use client'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuCheck,
  LuChevronsUpDown,
  LuLandmark,
  LuLoader2,
  LuUser2,
} from 'react-icons/lu'

import { saveMemberIntoCompanyAction } from '@/app/actions/saveMemberIntoCompanyAction'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import {
  type ISaveCarCompanySchema,
  SaveCarCompanySchema,
} from '@/schemas/SaveCarCompanySchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
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
type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporation?: IOrganizacaoSchema | null
  company?: IUnidadeSchema | null
  className?: string
  params?: { id_company: string; name_corporation: string }
}

export const VehicleCompanyForm = ({
  corporation,
  company,
  className,
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()

  const form = useForm<ISaveCarCompanySchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(SaveCarCompanySchema),
    defaultValues: {
      id_vehicle: null,
      id_company: company?.id,
      id_corporation: corporation?.id,
    },
  })

  const handleSubmit = (formData: Partial<IUnidadeSchema>): void => {
    startTransition(async () => {
      const result = await saveMemberIntoCompanyAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao salvar corporations! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: `Ok! Membro salvo na unidade ${company?.name} com sucesso! 🚀`,
          description: 'Tudo certo membro salvo',
        })
        redirect(`/servicos/unidades/${company?.name}-${company?.id}/carros`)
      }
    })
  }
  const $carWithoutComp = corporation?.members?.filter((memberItem) => {
    return (
      memberItem?.id !== null &&
      memberItem?.id !==
        company?.companyMembers?.find(
          (itemComp) => itemComp?.id === memberItem?.id,
        )?.id
    )
  })

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between space-y-2 p-4">
            <h1 className=" mr-auto text-xl font-bold">
              Salvar Veículo na Unidade
            </h1>
          </div>
        </div>
        <div className="my-8 px-3 md:px-28 md:py-10">
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
                <div className=" relative col-span-12 h-60   justify-center  rounded-[8px] border border-muted-foreground/10 md:flex lg:col-start-1 lg:col-end-6">
                  <Image
                    src={
                      company?.image ??
                      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
                    }
                    quality={100}
                    fill
                    alt="imagem director"
                    className="rounded-[5px] object-cover"
                  />
                </div>

                <div className="col-start-1 col-end-13  ml-4 mt-2 flex h-full flex-col justify-evenly  md:col-start-6  lg:mt-0">
                  <FormField
                    control={form.control}
                    name="id_company"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="id_cuser"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuUser2 /> Unidade
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
                                {field.value !== null
                                  ? corporation?.companies?.find(
                                      (comp) => comp?.id === field.value,
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
                                  {corporation?.companies?.map(
                                    (comp, index) => (
                                      <CommandItem
                                        value={comp?.id ?? undefined}
                                        key={index}
                                        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                        onSelect={async () => {
                                          form.setValue('id_company', comp?.id)
                                        }}
                                      >
                                        <LuCheck
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            comp?.id === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                        {comp?.name}
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
                  />{' '}
                  <FormField
                    control={form.control}
                    name="id_vehicle"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="id_vehicle"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuLandmark /> Veículo Unidade
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
                                {field.value !== null
                                  ? $carWithoutComp?.find((corp) => {
                                      return corp?.id === field.value
                                    })?.prefix
                                  : 'Selecione um membro'}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procurando Veículo..." />
                              <CommandEmpty>
                                Veículo não encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {$carWithoutComp?.map((car, index) => (
                                    <CommandItem
                                      value={car?.id ?? undefined}
                                      key={index}
                                      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                      onSelect={async () => {
                                        form.setValue('id_vehicle', car?.id)
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          car?.id === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {car?.prefix}
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
export default VehicleCompanyForm
