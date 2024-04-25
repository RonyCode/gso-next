import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideMenuSquare } from 'lucide-react'
import ModulesMain from '@/app/Modules/ModulesMain'

import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'GSO | Módulos',
  description: 'Página de escalas do site GSO.',
}
const Servicos = () => {
  return (
    <>
      <CardDefault
        title="Módulos"
        description="Serviços disponíveis para o usuario"
        icon={<LucideMenuSquare size={28} />}
      >
        <ModulesMain />
      </CardDefault>
    </>
  )
}
export default Servicos
