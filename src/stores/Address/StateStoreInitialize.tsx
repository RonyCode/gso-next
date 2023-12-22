'use client'

import { useRef } from 'react'

import { AddressProps } from '../../../types/index'

import { stateStore } from '@/stores/Address/stateStore'

type InitializeProps = {
  states: AddressProps[]
}

const StateStoreInitialize = ({ states }: InitializeProps) => {
  const initialize = useRef(false)
  if (!initialize.current) {
    stateStore.setState({ states })
    initialize.current = true
  }

  return null
}
export default StateStoreInitialize
