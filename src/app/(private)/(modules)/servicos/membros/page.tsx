import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { LuListChecks, LuUsers } from 'react-icons/lu'

import SelectMembersCorporation from '@/app/(private)/(modules)/components/SelectMembersCorporation'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { Button } from '@/ui/button'

const MembrosUnidade = async (): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  return (
    <div>
      {
        <CardDefault
          title={'Efetivo de minha corporação'}
          description="Membros"
          image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/members.jpg'}
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/members.jpg'
          }
          icon={<LuUsers size={28} />}
          iconDescription={<LuListChecks size={18} />}
        >
          {data !== undefined ? (
            <div className="overflow-scroll p-4 lg:overflow-hidden">
              <SelectMembersCorporation organizacoes={data} />
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
      }
    </div>
  )
}
export default MembrosUnidade
