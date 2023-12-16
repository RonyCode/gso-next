import { fetchWrapper } from '@/functions/fetch'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { FaBuildingColumns } from 'react-icons/fa6'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import * as React from 'react'
import { Control, FieldElement } from 'react-hook-form'

type GetEstadosProps = {
  formControl: Control<FieldElement>
  name: string
  label: string
  state?: string
  id?: string
  shortName?: string
}

export const GetEstados = async ({
  formControl,
  name,
  label,
}: GetEstadosProps) => {
  const resp = await fetchWrapper<GetEstadosProps>('/api/estados', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (resp) {
    return (
      <>
        <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor={name} className="flex items-center gap-1">
                <FaBuildingColumns /> {label}
              </FormLabel>{' '}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um Estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Selecione</SelectLabel>

                    {resp?.map((state) => (
                      <SelectItem key={state.id} value={state.shortName}>
                        {state.state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    )
  }
}
