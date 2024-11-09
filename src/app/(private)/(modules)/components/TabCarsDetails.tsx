'use client'
import Link from 'next/link'
import React from 'react'
import { LuPlusCircle } from 'react-icons/lu'

import { columnsCars } from '@/components/DataTables/DataTableCars/columnsCars'
import { DataTableCars } from '@/components/DataTables/DataTableCars/data-table-cars'
import { cn } from '@/lib/utils'
import { type ICarSchema } from '@/schemas/CarsSchema'
import { Button, buttonVariants } from '@/ui/button'
import { Card } from '@/ui/card'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  cars?: ICarSchema[]
  className?: string
}

export const TabCarsDetails = ({
  cars,
  className,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  console.log(cars)
  return (
    <div className={cn('', className)} {...props}>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4  space-y-2 p-6">
            <h1 className="ml-4 mr-auto pt-2 text-xl font-bold">Veículos</h1>
            <Link href="/servicos/gestor/salvar-veiculo">
              <Button
                className={cn(buttonVariants({ variant: 'outline' }), 'group ')}
              >
                <div className="flex items-center gap-1 ">
                  <LuPlusCircle
                    size={16}
                    className="text-foreground group-hover:text-muted-foreground"
                  />
                  Adicionar{' '}
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className="  md:p-6">
          {cars !== null && cars !== undefined && (
            <DataTableCars columns={columnsCars} data={cars} />
          )}
        </div>
      </Card>
    </div>
  )
}
export default TabCarsDetails
