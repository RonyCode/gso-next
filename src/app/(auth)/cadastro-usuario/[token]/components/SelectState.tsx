import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { FaBuildingColumns } from 'react-icons/fa6'
import * as React from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/ui/command'
import { getAllStates } from '@/lib/getAllStates'
import { use } from 'react'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema'

type SelectStateProps = {
  form: UseFormReturn<RegisterUserSchema>
  field: ControllerRenderProps<FieldValues, string>
}

const arrayState = getAllStates()

export default function SelectState({ form, field }: SelectStateProps) {
  async function handleCity(value: string) {
    cityStore.setState({ cities: await getAllCitiesByState(value) })
  }

  const states = use(arrayState)

  return (
    <FormItem className="flex w-full flex-col">
      <FormLabel htmlFor="cidade" className="flex items-center gap-1">
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
                ? states.find((state) => state.shortName === field.value)?.state
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
              {states?.map((state) => (
                <CommandItem
                  value={state.shortName}
                  key={state.id}
                  onSelect={async () => {
                    await handleCity(state.shortName)
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
  )
}
