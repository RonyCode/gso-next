'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { LucideBuilding2, LucidePhone } from 'lucide-react'
import { Member, Unidade } from '../../../../types/index'
import { DataTableColumnHeader } from '@/components/DataTables/DataTableUnidades/data-table-column-header'
import { types } from '@/components/DataTables/DataTableUnidades/data/data'
import { FaRegAddressCard } from 'react-icons/fa'
import { formatCpfCnpj } from '@/functions/formatCpfCnpj'
import { DataTableRowActions } from '@/components/DataTables/DataTableUnidades/data-table-row-actions'

export const columnsUnidades: ColumnDef<Unidade>[] = [
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
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-64 items-center space-x-2 text-[0.9rem] text-muted-foreground">
          <Avatar
            className="flex h-10 w-10 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all
                        duration-300 hover:scale-[200%] md:h-20 md:w-20"
          >
            <AvatarImage
              className="aspect-square rounded-full object-cover"
              src={row.original.image}
            />
            <AvatarFallback>{<LucideBuilding2 size={36} />}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <div>
              <span className="flex items-center  p-1">
                {' '}
                <LucideBuilding2 size={16} className="mr-2" />{' '}
                {row.getValue('name')}
              </span>
            </div>
            <div>
              {' '}
              <span className="flex items-center  p-1">
                <FaRegAddressCard size={16} className="mr-2" />{' '}
                {formatCpfCnpj(row.original.cnpj)}
              </span>
            </div>
            <div>
              {' '}
              <span className="flex items-center p-1">
                <LucidePhone size={16} className="mr-2" /> {row.original.phone}
              </span>
            </div>
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue('type'))
      if (!type) {
        return null
      }
      return (
        <div className="flex w-full items-center text-[0.9rem] text-muted-foreground ">
          {type.label}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'director',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comandante / Diretor" />
    ),
    cell: ({ row }) => {
      const $director: Member = row.getValue('director')
      return (
        <div className="flex w-full items-center">
          <span className="mr-2 text-muted-foreground">
            {$director.competence} - {$director?.name}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'manager',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subcomandante / Gerente" />
    ),
    cell: ({ row }) => {
      const $manager: Member = row.getValue('manager')

      return (
        <div className="flex w-full items-center">
          <span className="mr-2 text-muted-foreground">
            {$manager.competence} - {$manager?.name || 'N/A'}
          </span>
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
      <DataTableColumnHeader column={column} title="BBM / Uni.Gerente" />
    ),
    cell: ({ row }) => {
      const $unidadeGerente: Unidade = row.getValue('manager_company')

      return (
        <div className="flex w-full items-center">
          <span className="mr-2 text-muted-foreground">
            {$unidadeGerente?.name ?? 'N/A'}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'director_company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const $unidadeDirector: Unidade = row.getValue('director_company')

      return (
        <div className="flex w-[200px] items-center">
          <span className="mr-2 text-muted-foreground">
            {$unidadeDirector?.name ?? 'N/A'}
          </span>
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
  },
]
