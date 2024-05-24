'use client'

import { useRef } from 'react'

import { type AddressProps } from '../../../types/index'

import { stateStore } from '@/stores/Address/stateStore'

interface InitializeProps {
  states: AddressProps[]
}

const StateStoreInitialize = ({ states }: InitializeProps): null => {
  const initialize = useRef(false)
  if (!initialize.current) {
    stateStore.setState({ states })
    initialize.current = true
  }

  return null
}
export default StateStoreInitialize
