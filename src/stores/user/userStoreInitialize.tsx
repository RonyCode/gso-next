'use client'

import { useRef } from 'react'

import { UserType } from '../../../types/index'

import { useUserStore } from './userStore'

type InitializeProps = {
  user: UserType
}

const UserStoreInitialize = ({ user }: InitializeProps) => {
  const initialize = useRef(false)
  if (!initialize.current) {
    useUserStore.setState({ state: { user } })
    initialize.current = true
  }

  return null
}
export default UserStoreInitialize
