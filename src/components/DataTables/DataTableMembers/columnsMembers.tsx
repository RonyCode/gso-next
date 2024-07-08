'use client'

import React from 'react'
import { LuBuilding2, LuMail, LuPhone, LuUser } from 'react-icons/lu'

import { DataTableRowActions } from '@/components/DataTables/DataTableMembers/data-table-row-actions'
import { DataTableColumnHeader } from '@/components/DataTables/DataTableUnidades/data-table-column-header'
import { types } from '@/components/DataTables/DataTableUnidades/data/data'
import { maskPhone } from '@/functions/masks/maskphone'
import { type IMemberSchema } from '@/schemas/MemberSchema'
import { type Unidade } from '@/types/index'
import { Badge } from '@/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsMembers: Array<ColumnDef<IMemberSchema>> = [
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
      <DataTableColumnHeader column={column} title="Dados Membro" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex min-w-64 items-center space-x-2 text-[0.8500rem] text-muted-foreground">
            <Avatar
              className="flex h-14 w-14 items-center justify-center  rounded-full transition-all
                        duration-300 hover:scale-[200%]"
            >
              <AvatarImage
                className="aspect-square rounded-full object-cover"
                src={
                  row.original?.image ??
                  process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.svg'
                }
              />
              <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center ">
              <div>
                <div className="flex items-center  py-0.5">
                  {' '}
                  <LuUser size={16} className="mr-2" /> {row.getValue('name')}
                </div>
              </div>
              <div>
                {' '}
                <div className="flex items-center py-0.5 ">
                  <LuMail size={16} className="mr-2" /> {row.original?.email}
                </div>
              </div>
              <div>
                {' '}
                <div className="flex items-center py-0.5">
                  <LuPhone size={16} className="mr-2" />{' '}
                  {maskPhone(row.original?.phone)}
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
              {row.original?.competence} - {row.original?.id_function} -{' '}
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
      const $unidadeGerente: Unidade = row.getValue('manager_company')

      return (
        <div className="flex w-full items-center">
          <div className="mr-2 text-muted-foreground">
            {$unidadeGerente?.name ?? 'N/A'}
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
