'use client'

import { useRef } from 'react'

import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { organizacaoStore } from '@/stores/organizacoes/organizacaoStore'

interface InitializeProps {
  organizacao: IOrganizacaoSchema[]
}

const OrganizacaoStoreInitialize = ({ organizacao }: InitializeProps): null => {
  const initialize = useRef(false)
  if (!initialize.current) {
    organizacaoStore.setState({ state: { organizacao } })
    initialize.current = true
  }

  return null
}
export default OrganizacaoStoreInitialize
