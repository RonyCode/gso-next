import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { FaBuildingColumns } from 'react-icons/fa6'
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
import * as React from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { cityStore } from '@/stores/Address/CityByStateStore'

type SelectCityProps = {
  form: UseFormReturn
  field: ControllerRenderProps<FieldValues, string>
}

export const SelectCity = ({ form, field }: SelectCityProps) => {
  const arrayCitiesByState = cityStore.getState().cities
  console.log(arrayCitiesByState)
  return (
    <FormItem className="flex w-full flex-col">
      <FormLabel htmlFor="cidade" className="flex items-center gap-1">
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
                ? arrayCitiesByState.find((city) => city.city === field.value)
                    ?.city
                : 'Selecione uma Cidade'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Procurando cidade..." />
            <CommandEmpty>Cidade não encontrada.</CommandEmpty>
            <CommandGroup>
              {arrayCitiesByState.map((city) => (
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
                      city.city === field.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {city.city}
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

export default SelectCity
