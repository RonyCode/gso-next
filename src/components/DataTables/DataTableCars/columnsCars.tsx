'use client'

import React from 'react'
import { FaRegAddressCard } from 'react-icons/fa'
import { LuBuilding2, LuPhone } from 'react-icons/lu'

import { DataTableColumnHeader } from '@/components/DataTables/DataTableUnidades/data-table-column-header'
import { DataTableRowActions } from '@/components/DataTables/DataTableUnidades/data-table-row-actions'
import { types } from '@/components/DataTables/DataTableUnidades/data/data'
import { maskPhone } from '@/functions/masks/maskphone'
import { type Car } from '@/types/index'
import { Badge } from '@/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsCars: Array<ColumnDef<Car>> = [
  // {
  //   id: 'select',
  //   header: ({ table }) => {
  //     return (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     )
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dados Unidade" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex w-64 items-center space-x-2 text-[0.8500rem] text-muted-foreground">
            <Avatar
              className="flex h-10 w-10 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all
                        duration-300 hover:scale-[200%] md:h-20 md:w-20"
            >
              <AvatarImage
                className="aspect-square rounded-full object-cover"
                src={row.getValue('imageMember')}
              />
              <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center ">
              <div>
                <div className="flex items-center  p-1">
                  {' '}
                  <LuBuilding2 size={16} className="mr-2" />{' '}
                  {row.getValue('name')}
                </div>
              </div>
              <div>
                {' '}
                <div className="flex items-center p-1 ">
                  <FaRegAddressCard size={16} className="mr-2" />{' '}
                  {row.getValue('id')}
                </div>
              </div>
              <div>
                {' '}
                <div className="flex items-center p-1">
                  <LuPhone size={16} className="mr-2" />{' '}
                  {maskPhone(row.getValue('phone'))}
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
  },

  {
    accessorKey: 'director',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gestores" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">
          <div className="mr-2 flex flex-col space-y-1 text-muted-foreground">
            <span>
              {row.original?.color} - {row.original?.model} -{' '}
              <Badge variant="secondary">CMD</Badge>
            </span>
          </div>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'manager_company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unidade Gestora" />
    ),
    cell: ({ row }) => {
      const $unidadeGerente: Car = row.getValue('manager_company')

      return (
        <div className="flex w-full items-center">
          <div className="mr-2 text-muted-foreground">
            {$unidadeGerente?.local ?? 'N/A'}
          </div>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue('type'))
      if (type == null) {
        return null
      }
      return (
        <Badge
          variant="secondary"
          className="flex w-full items-center justify-center"
        >
          {type.label}
        </Badge>
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
