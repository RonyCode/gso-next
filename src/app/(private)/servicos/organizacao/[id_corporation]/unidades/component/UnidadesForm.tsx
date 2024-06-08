import React, { use } from 'react'

import TabUnidadeDetails from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/TabUnidadeDetails'
import { getAllStates } from '@/lib/getAllStates'
import { getUnidadeById } from '@/lib/GetUnidadeById'
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
  className?: string
  params: { id: string; id_corporation: string }
}

export const UnidadesForm = ({
  className,
  params,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  const { data } = use(getUnidadeById(params.id_corporation, params.id))
  const states = use(getAllStates())
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
          <TabUnidadeDetails unidade={data} states={states} />
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
