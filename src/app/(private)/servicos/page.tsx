import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideMenuSquare } from 'lucide-react'
import ModulesGso from '@/components/ModulesGso/ModulesGso'

import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'GSO | Módulos',
  description: 'Página de escalas do site GSO.',
}
const Servicos = () => {
  return (
    <>
      <div className="min-h-screen">
        <CardDefault
          title="Módulos"
          description="Serviços disponíveis para o usuario"
          icon={<LucideMenuSquare size={28} />}
        >
          <ModulesGso />
        </CardDefault>
      </div>
    </>
  )
}
export default Servicos
