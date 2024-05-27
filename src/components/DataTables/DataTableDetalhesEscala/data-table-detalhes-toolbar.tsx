'use client'

import { type ReactElement } from 'react'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { statuses, types, unities } from './data/data'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableDetalhesToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>): ReactElement {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="gird w-full  grid-cols-2 gap-2  md:grid-cols-3">
      <Input
        placeholder="Filtrar escalas..."
        value={(table.getColumn('date')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('date')?.setFilterValue(event.target.value)
        }
        className="h-8 w-full lg:w-[250px]"
      />
      <div className=" flex justify-between gap-1 pt-2">
        <div>
          {table.getColumn('status') != null && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Situação"
              options={statuses}
            />
          )}
        </div>
        <div>
          {table.getColumn('type') != null && (
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title="Tipo"
              options={types}
            />
          )}
        </div>
        <div>
          {table.getColumn('unity') != null && (
            <DataTableFacetedFilter
              column={table.getColumn('unity')}
              title="Unidades"
              options={unities}
            />
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
