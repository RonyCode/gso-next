'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LuCheck, LuChevronsUpDown, LuLandmark } from 'react-icons/lu'

import { columnsMembers } from '@/components/DataTables/DataTableMembers/columnsMembers'
import { DataTableMembers } from '@/components/DataTables/DataTableMembers/data-table-members'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import {
  type ISelectCorporationModuleSchema,
  SelectCorporationModuleSchema,
} from '@/schemas/SelectCorpoationModuleSchema'
import { unidadeStore } from '@/stores/unidades/unidadeStore'
import { Button } from '@/ui/button'
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

type SelectCompanyModuleProps = React.HTMLAttributes<HTMLDivElement> & {
  organizacoes?: IOrganizacaoSchema[]
  className?: string
  param?: string
}

export const SelectCompanyModule = ({
  organizacoes,
  className,
  param,
  ...props
}: SelectCompanyModuleProps) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const { data: session } = useSession()
  const [disable, setDisable] = useState(false)
  const [organizacaoFounded, setOrganizacaoFounded] = useState(
    {} as IOrganizacaoSchema,
  )
  const form = useForm<ISelectCorporationModuleSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(SelectCorporationModuleSchema),
    defaultValues: {
      id_company: session?.id_company ?? '',
      id_corporation: session?.id_corporation ?? '',
    },
  })
  useEffect(() => {
    setDisable(
      session?.id_corporation !== null &&
        session?.id_corporation !== undefined &&
        session?.role !== 'admin',
    )
  }, [session?.id_corporation, session?.role])

  const handleSubmit = (formData: ISelectCorporationModuleSchema): void => {
    startTransition(() => {
      const organizacaoFound = organizacoes?.find((organizacao) => {
        return organizacao?.id === formData?.id_corporation
      })

      if (organizacaoFound?.id !== formData?.id_corporation) {
        toast({
          variant: 'danger',
          title: 'Não existe unidades para essa corporação! 🤯 ',
          description: 'Algo deu errado organização não existe! 🤯',
        })
      }
      if (organizacaoFound?.id === formData?.id_corporation) {
        //  update({
        //   ...session,
        //   id_corporation: formData?.id_corporation,
        // })
        router.refresh()

        toast({
          variant: 'success',
          title: 'Ok! Serviços encontrados com sucesso! 🚀',
          description: `Tudo certo serviços para ${organizacaoFound?.short_name_corp} encontrados`,
        })
      }
    })
  }
  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="bg-background  p-6">
        <div className="flex items-center">
          <Card className="flex w-full flex-col items-center justify-between gap-2 p-4 ">
            <h1 className="mr-auto pb-4 text-xl font-bold">
              Minha Organização
            </h1>
            <Form {...form}>
              <LoadingPage pending={pending} />
              <form className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="id_corporation"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="id_corporation"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuLandmark /> Organização
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                disable && 'text-muted-foreground',
                              )}
                            >
                              {field.value !== ''
                                ? organizacoes?.find(
                                    (state) =>
                                      state.id?.toString() ===
                                      field.value?.toString(),
                                  )?.name
                                : 'Selecione uma corporação'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando organizações..." />
                            <CommandEmpty>
                              Organização não encontrada.
                            </CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {organizacoes?.map((corp, index) => (
                                  <CommandItem
                                    value={corp?.id ?? undefined}
                                    key={index}
                                    onSelect={() => {
                                      unidadeStore.setState({
                                        state: { unidades: [] },
                                      })
                                      form.setValue('id_company', '')
                                      setOrganizacaoFounded(corp)
                                      handleSubmit({
                                        ...form.getValues(),
                                        id_corporation:
                                          String(corp.id) ?? corp.id,
                                      })
                                      form.setValue('id_corporation', corp?.id)
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
                                    {corp.name}
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
              </form>
            </Form>
          </Card>
        </div>
        {organizacaoFounded?.members != null && (
          <DataTableMembers
            columns={columnsMembers}
            data={organizacaoFounded?.members}
          />
        )}
      </Card>
    </>
  )
}
export default SelectCompanyModule
