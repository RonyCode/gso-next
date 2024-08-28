import { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import OrganizacaoForm from './component/OrganizacaoForm'

import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllStates } from '@/lib/getAllStates'

const salvarOrganizacao = async (): Promise<ReactNode> => {
  const states = await getAllStates()
  return (
    <>
      <CardDefault
        title="Salvar Organização"
        description="Salvar/Atualizar Organização"
        icon={<LuBuilding2 size={28} />}
      >
        <OrganizacaoForm states={states} />
      </CardDefault>
    </>
  )
}
export default salvarOrganizacao
