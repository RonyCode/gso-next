'use client'
import Image from 'next/image'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuBuilding2,
  LuCheck,
  LuChevronsUpDown,
  LuLandmark,
  LuLoader2,
} from 'react-icons/lu'

import { saveMemberIntoCorporationAction } from '@/app/actions/saveMemberIntoCorporationAction'
import { searchUserAction } from '@/app/actions/searchUserAction'
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
import { debounce } from 'lodash'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema[] | null
  users?: UserType[] | null
  className?: string
  states?: AddressProps[] | null
  params?: { id_company: string; name_corporation: string }
}

export const MemberForm = ({
  corporations,
  className,
}: UserRegisterFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const [corpFound, setCorpFound] = React.useState({} as IOrganizacaoSchema)

  const form = useForm<ISaveMemberSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(SaveMemberSchema),

    defaultValues: {
      id_corporation: null,
      termo_busca: null,
    },
  })
  const handleSubmit = (formData: Partial<IUnidadeSchema>): void => {
    // startTransition(async () => {
    //   const result = await saveMemberIntoCorporationAction(formData)
    //   if (result?.code !== 202) {
    //     toast({
    //       variant: 'danger',
    //       title: 'Erro ao salvar membro na corporação! 🤯 ',
    //       description: result?.message,
    //     })
    //   }
    //   if (result?.code === 202) {
    //     toast({
    //       variant: 'success',
    //       title: 'Ok! Membro salvo com sucesso! 🚀',
    //       description: 'Tudo certo membro salvo na corporação',
    //     })
    //     redirect(`/servicos/membros`)
    //   }
    // })
  }

  async function search(criteria: string) {
    if (
      form.getValues('id_corporation') != null &&
      form.getValues('id_corporation') !== undefined
    ) {
      const response = await searchUserAction(
        form.getValues('id_corporation'),
        criteria,
      )
      return response
    }
  }

  // Debounced function recreated on every render 😞
  const debouncedSearch = debounce(async (criteria: string) => {
    const re = await search(criteria)
    console.log(re)
  }, 800)

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between space-y-2 p-4">
            <h1 className=" mr-auto text-xl font-bold">
              Salvar Membro Corporação
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
                      process?.env?.NEXT_PUBLIC_API_GSO != null &&
                      corpFound?.image != null
                        ? process?.env?.NEXT_PUBLIC_API_GSO + corpFound?.image
                        : process.env.NEXT_PUBLIC_API_GSO +
                          '/public/images/img.png'
                    }
                    quality={100}
                    fill
                    alt="imagem corp"
                    className="rounded-[5px] object-cover"
                  />
                </div>

                <div className="col-start-1 col-end-13  ml-4 mt-2 flex h-full flex-col justify-evenly  md:col-start-6  lg:mt-0">
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
                                  'w-full justify-between text-muted-foreground',
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
                                      onSelect={() => {
                                        setCorpFound(corp)
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
                  <div className="flex w-full items-end gap-2">
                    <FormField
                      control={form.control}
                      name="termo_busca"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="termo_busca"
                            className="flex items-center gap-1 text-muted-foreground"
                          >
                            <LuBuilding2 /> Buscar Membro
                          </FormLabel>
                          <FormControl>
                            <Input
                              onInput={async () => {
                                await debouncedSearch(field?.value)
                              }}
                              {...field}
                              id="termo_busca"
                              placeholder="Buscar por Nome, CPF ou Email"
                              autoCapitalize="none"
                              autoComplete="termo_busca"
                              autoCorrect="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: 'default' }),
                        ' w-full animate-fadeIn  md:w-1/3 ',
                      )}
                    >
                      {pending && (
                        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}{' '}
                      Buscar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
                <Button
                  disabled={!form.formState.isValid}
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
