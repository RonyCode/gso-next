import { CardDefault } from '@/components/Cards/CardDefault'
import React from 'react'
import { LuUser } from 'react-icons/lu'

const Teste = () => {
  return (
    <>
      <CardDefault title="teste" description="teste" icon={<LuUser />}>
        teste
      </CardDefault>
    </>
  )
}

export default Teste
