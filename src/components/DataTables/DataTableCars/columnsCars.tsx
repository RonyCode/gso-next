'use client'

import React from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import { DataTableColumnHeader } from '@/components/DataTables/DataTableCars/data-table-column-header'
import { DataTableRowActions } from '@/components/DataTables/DataTableCars/data-table-row-actions'
import {
  condition,
  statusVehicle,
} from '@/components/DataTables/DataTableCars/data/data'
import { Checkbox } from '@/components/ui/checkbox'
import { type ICarSchema } from '@/schemas/CarsSchema'
import { Badge } from '@/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsCars: Array<ColumnDef<ICarSchema>> = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Imagem" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex w-full items-center  text-[0.8500rem] text-muted-foreground">
            <Avatar
              className="flex h-14 w-14 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all
                        duration-300 hover:scale-[140%] md:h-20 md:w-20"
            >
              <AvatarImage
                className="aspect-square rounded-full object-cover"
                src={
                  process.env.NEXT_PUBLIC_API_GSO &&
                  process.env.NEXT_PUBLIC_API_GSO + row.original.image
                }
              />
              <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
            </Avatar>
          </div>
        </>
      )
    },
  },

  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">{row.getValue('brand')}</div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">{row.getValue('model')}</div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'fuel_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Combustível" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">
          <div className="mr-2 text-muted-foreground">
            {row.getValue('fuel_type')}
          </div>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'plate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placa" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="items-centitems-centerer flex w-full justify-center rounded-[5px] py-2 "
        >
          {row.getValue('plate')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'prefix',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prefixo" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="items-centitems-centerer flex w-full justify-center rounded-[5px] py-2 "
        >
          {row.getValue('prefix')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'condition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condição" />
    ),
    cell: ({ row }) => {
      const conditionValue = condition.find(
        (type) => type.value === row.getValue('condition'),
      )
      if (conditionValue == null) {
        return null
      }
      return (
        <div className="flex w-full items-center justify-center">
          {conditionValue.label}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusValue = statusVehicle.find(
        (type) => type.value === row.getValue('status'),
      )
      if (statusValue == null) {
        return null
      }
      return (
        <div className="flex w-full items-center justify-center">
          {statusValue.label}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
