'use client'

// import { Checkbox } from '@/components/ui/checkbox'

import { labels, statuses, types, unities } from './data/data'
import { type Task } from './data/schema'

import { DataTableColumnHeader } from '@/components/DataTables/DataTableEscala/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsEscala: Array<ColumnDef<Task>> = [
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
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.start)

      return (
        <div className="flex space-x-2 ">
          <span className="max-w-96 truncate font-medium">
            {row.getValue('date')}
          </span>
          {label != null && <Badge variant="outline">{label.label}</Badge>}
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

      if (type == null) {
        return null
      }

      return (
        <div className="flex items-center">
          <type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{type.label}</span>
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
      <DataTableColumnHeader column={column} title="Situação" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status'),
      )

      if (status == null) {
        return null
      }

      return (
        <div className="flex w-[120px] items-center ">
          <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />

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
    accessorKey: 'unity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unidade" />
    ),
    cell: ({ row }) => {
      const unity = unities.find(
        (unity) => unity.value === row.getValue('unity'),
      )
      const group = labels.find((label) => label.value === row.original.group)

      if (unity == null) {
        return null
      }

      return (
        <div className="flex w-[200px] items-center">
          {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
          {unity.icon && (
            <unity.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="mr-2 text-muted-foreground">{unity.label}</span>
          {group != null && (
            <Badge
              variant="outline"
              className={`${
                group.label.charAt(0).toUpperCase() === 'A'
                  ? 'border-primary text-primary'
                  : group.label.charAt(0).toUpperCase() === 'B'
                    ? 'border-blue-500 text-blue-500'
                    : group.label.charAt(0).toUpperCase() === 'C'
                      ? 'border-green-600 text-green-600'
                      : group.label.charAt(0).toUpperCase() === 'D'
                        ? 'border-yellow-400 text-yellow-400'
                        : group.label.charAt(0).toUpperCase() === 'E'
                          ? 'border-[#9400d3] text-[#9400d3]'
                          : ''
              }`}
            >
              {group.label}
            </Badge>
          )}
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
