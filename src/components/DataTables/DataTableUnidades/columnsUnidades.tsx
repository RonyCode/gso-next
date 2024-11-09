'use client'

import React from 'react'
import { FaRegAddressCard } from 'react-icons/fa'
import { LuBuilding2, LuPhone } from 'react-icons/lu'

import { DataTableColumnHeader } from '@/components/DataTables/DataTableUnidades/data-table-column-header'
import { DataTableRowActions } from '@/components/DataTables/DataTableUnidades/data-table-row-actions'
import { types } from '@/components/DataTables/DataTableUnidades/data/data'
import { maskCpfCnpj } from '@/functions/masks/maskCpfCnpj'
import { maskPhone } from '@/functions/masks/maskphone'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type Unidade } from '@/types/index'
import { Badge } from '@/ui/badge'
import { Checkbox } from '@/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsUnidades: Array<ColumnDef<IUnidadeSchema>> = [
  {
    id: 'id',
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dados Unidade" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex w-52 items-center space-x-2 text-[.750rem] text-muted-foreground  xl:text-[0.8500rem]">
            <Avatar
              className="flex h-12 w-12 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all
                        duration-300 hover:scale-[200%] md:h-14 md:w-14"
            >
              <AvatarImage
                className="aspect-square rounded-full object-cover"
                src={
                  process.env.NEXT_PUBLIC_API_GSO != null &&
                  row.original.image != null
                    ? process?.env?.NEXT_PUBLIC_API_GSO + row.original.image
                    : process?.env?.NEXT_PUBLIC_API_GSO +
                      '/public/images/img.jpg'
                }
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
                <div className="flex items-center  ">
                  <FaRegAddressCard size={16} className="mr-2" />{' '}
                  {maskCpfCnpj(row.original.cnpj)}
                </div>
              </div>
              <div>
                {' '}
                <div className="flex items-center">
                  <LuPhone size={16} className="mr-2" />{' '}
                  {maskPhone(row.original.phone)}
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
        <div className="flex w-48 items-center text-[.750rem] xl:text-[0.8500rem] ">
          <div className="mr-2 flex flex-col space-y-1 text-muted-foreground">
            <span>
              {row.original?.type} - {row.original?.name} -{' '}
              <Badge variant="secondary">CMD</Badge>
            </span>

            {row.original?.name !== '' && (
              <span>
                {row.original.type} - {row.original?.name}{' '}
                <Badge variant="secondary">SUB CMD</Badge>
              </span>
            )}
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
      const $unidadeGerente: Unidade = row.getValue('manager_company')

      return (
        <div className="flex w-20 items-center  text-[.750rem] xl:text-[0.8500rem] ">
          <div className="mr-2">{$unidadeGerente?.name ?? 'N/A'}</div>
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
          className="space-0 m-0  flex items-center justify-center p-0   text-[.750rem]  "
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
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
