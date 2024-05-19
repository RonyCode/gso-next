'use client'

import { ColumnDef } from '@tanstack/react-table'

// import { Checkbox } from '@/components/ui/checkbox'

import { statuses, unities } from './data/data'
import { DataTableColumnHeader } from '../data-table-column-header'
import { Checkbox } from '@/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { LucideBuilding2, LucidePhone, LucideUser } from 'lucide-react'
import { Unidade } from '../../../../types/index'

export const columnsUnidades: ColumnDef<Unidade>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
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
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
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
              <span className="flex items-center p-1">
                {' '}
                <LucideUser size={16} className="mr-2" /> {row.getValue('name')}
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
      const status = statuses.find(
        (status) => status.value === row.getValue('type'),
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[120px] items-center ">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    // cell: ({ row }) => <div className="w-[40px]">{row.getValue('end')}</div>,
    // enableSorting: true,
    // enableHiding: true,
  },

  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unidade" />
    ),
    cell: ({ row }) => {
      const unity = unities.find((unity) => unity.value === row.getValue('id'))

      if (!unity) {
        return null
      }

      return (
        <div className="flex w-[200px] items-center">
          {unity.icon && (
            <unity.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="mr-2 text-muted-foreground">{unity.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
