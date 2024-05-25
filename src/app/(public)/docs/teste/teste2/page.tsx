import React, { type ReactNode } from 'react'
import { LuUser } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'

const Teste2 = (): ReactNode => {
  return (
    <>
      <>
        <CardDefault title="teste" description="teste" icon={<LuUser />}>
          teste2
        </CardDefault>
      </>
    </>
  )
}
export default Teste2
