import { type ReactNode } from 'react'
import { LuBookOpenCheck } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'

const Leis = (): ReactNode => {
  return (
    <>
      <CardDefault
        title="Leis"
        description="Acervo de leis "
        icon={<LuBookOpenCheck size={28} />}
      >
        <h1>Leis</h1>
      </CardDefault>
    </>
  )
}
export default Leis
