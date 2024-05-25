import React, { type ReactNode } from 'react'
import { LuUser } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'

const Teste = (): ReactNode => {
  return (
    <CardDefault title="teste" description="teste" icon={<LuUser />}>
      teste
    </CardDefault>
  )
}

export default Teste
