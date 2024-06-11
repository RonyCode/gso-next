import { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'

const salvarOrganizacao = (): ReactNode => {
  return (
    <>
      <CardDefault
        title="Salvar Organização"
        description="Salvar/Atualizar Organização"
        icon={<LuBuilding2 size={28} />}
      >
        teste
      </CardDefault>
    </>
  )
}
export default salvarOrganizacao
