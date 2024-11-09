import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React from 'react'
import { LuFolderCog } from 'react-icons/lu'

import SelectCorporationModule from '@/app/(private)/(modules)/components/SelectCorporationModule'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { Button } from '@/ui/button'

const listaUnidades = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  const dataCorporacao = await getAllOrganizacoes()
  const corporacaoFound = dataCorporacao?.data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })
  // const { data } = await getAllUnidades(session?.id_corporation ?? '')

  revalidatePath('/')
  return (
    <>
      <CardDefault
        title="Serviços"
        description="Serviços disponíveis por modules"
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/modules.png'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/modules.png'
        }
        icon={<LuFolderCog size={28} />}
      >
        {session?.id_corporation === null && session?.role === 'admin' && (
          <SelectCorporationModule organizacoes={dataCorporacao?.data} />
        )}

        {session?.id_corporation != null &&
        corporacaoFound?.companies !== undefined ? (
          <div className="overflow-scroll p-4 lg:overflow-hidden">
            <DataTableUnidades
              data={corporacaoFound.companies}
              columns={columnsUnidades}
            />
          </div>
        ) : (
          <CardWithLogo
            title="Usuário sem Corporação"
            description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
          >
            <Link href="/contact">
              <Button>Solicitar inclusão</Button>
            </Link>
          </CardWithLogo>
        )}
      </CardDefault>
    </>
  )
}
export default listaUnidades
