import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideMenuSquare } from 'lucide-react'
import ModulesServices from '@/app/(private)/servicos/module/ModulesServices'

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
        description="Serviços para o usuario"
        image="/images/servico3.jpeg"
        imageMobile="/images/servicos2.jpg"
        icon={<LucideMenuSquare size={28} />}
      >
        <ModulesServices />
      </CardDefault>
    </>
  )
}
export default Servicos
