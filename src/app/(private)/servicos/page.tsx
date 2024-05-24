import { type Metadata } from 'next'
import React from 'react'
import { LuMenuSquare } from 'react-icons/lu'

import ModulesServices from '@/app/(private)/servicos/module/ModulesServices'
import { CardDefault } from '@/components/Cards/CardDefault'

export const metadata: Metadata = {
  title: 'GSO | Módulos',
  description: 'Página de escalas do site GSO.',
}

const Servicos = () => {
  return (
    <>
      <CardDefault
        title="Módulos"
        description="Serviços para o usuario"
        image="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        imageMobile="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        icon={<LuMenuSquare size={28} />}
      >
        <ModulesServices />
      </CardDefault>
    </>
  )
}
export default Servicos
