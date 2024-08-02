'use client'
import { labels, statuses } from './data/data'

import { DataTableColumnHeader } from '@/components/DataTables/DataTableEscala/data-table-column-header'
import { DataTableRowActions } from '@/components/DataTables/DataTableEscala/data-table-row-actions'
import { Badge } from '@/components/ui/badge'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { Checkbox } from '@/ui/checkbox'
import { type ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

export const columnsEscala: Array<ColumnDef<IScheduleSchema>> = [
  // {
  //   id: 'id',
  //   header: ({ table }) => {
  //     return (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={(value) => {
  //           table.toggleAllPageRowsSelected(!!value)
  //         }}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => {
  //           row.toggleSelected(!!value)
  //         }}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     )
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: 'date_creation',
    header: ({ column }) => (
      <div className="flex gap-14">
        <DataTableColumnHeader column={column} title="Data Inicio" />
        <DataTableColumnHeader column={column} title="Data Fim" />
      </div>
    ),
    cell: ({ row }) => {
      const hourStart = row?.original?.hour_start
        .split(':')
        .slice(0, 1)
        .join(':')
      const hourFinal = row?.original?.hour_start
        .split(':')
        .slice(0, 1)
        .join(':')
      const qtdHour = row?.original?.type === 2 ? 12 : 24

      return (
        <div className="flex space-x-2 text-[.8rem] ">
          <span className="max-w-96 truncate font-medium">
            {moment(row.getValue('date_creation'))
              .set({
                hour: +hourStart ?? 0,
                minute: 0,
                second: 0,
                millisecond: 0,
              })
              .format('DD/MM/yyyy HH:mm')}
          </span>
          <p></p>
          <p></p> |<p></p>
          <span className="max-w-96 truncate font-medium">
            {moment(row.getValue('date_creation'))
              .set({
                hour: +hourFinal ?? 0,
                minute: 0,
                second: 0,
                millisecond: 0,
              })
              .add(qtdHour, 'hours')
              .format('DD/MM/yyyy HH:mm')}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Situação" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) =>
          status.value.toString() === row?.getValue('status')?.toString(),
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
  },
  {
    accessorKey: 'team',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipe" />
    ),
    cell: ({ row }) => {
      const group = labels.find(
        (label) => label?.value?.toString() === row.original?.team?.toString(),
      )

      return (
        <div className="flex w-full items-center">
          <Badge
            variant="outline"
            className={` scale-[90%]  ${
              group?.value === 1
                ? 'border-primary/85 text-primary/85'
                : group?.value === 2
                  ? 'border-blue-500/85 text-blue-500/85'
                  : group?.value === 3
                    ? 'border-yellow-400/85 text-yellow-400/85'
                    : group?.value === 4
                      ? 'border-green-500/85 text-green-500/85'
                      : group?.value === 5
                        ? 'border-[#9400d3]/85 text-[#9400d3]/85'
                        : ''
            }`}
          >
            {group?.label}
          </Badge>
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
