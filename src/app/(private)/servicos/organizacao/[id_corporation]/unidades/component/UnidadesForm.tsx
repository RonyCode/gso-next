'use client'

import React from 'react'

import {
  type AddressProps,
  type Unidade,
} from '../../../../../../../../types/index'

import TabUnidadeDetails from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/TabUnidadeDetails'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  unidades: Unidade
  className?: string
  states: AddressProps[] | null
}

export const UnidadesForm = ({
  unidades,
  // eslint-disable-next-line react/prop-types
  className,
  states,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  return (
    <main className="grid flex-1 items-start">
      <Tabs defaultValue="dadosGerais">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="dadosGerais">Dados gerais</TabsTrigger>
            <TabsTrigger value="efetivo">Efetivo</TabsTrigger>
            <TabsTrigger value="viaturas">Viaturas</TabsTrigger>
            <TabsTrigger value="listaEscala">Escalas</TabsTrigger>
          </TabsList>
        </div>{' '}
        <TabsContent value="dadosGerais">
          <TabUnidadeDetails unidades={unidades} states={states} />
        </TabsContent>
        <TabsContent value="efetivo">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="viaturas">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="listaEscala">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
export default UnidadesForm
