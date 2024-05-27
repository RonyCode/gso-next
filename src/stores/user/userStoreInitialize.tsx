'use client'

import { useRef } from 'react'

import { type UserType } from '../../../types/index'
import { useUserStore } from './userStore'

interface InitializeProps {
  user: UserType
}

const UserStoreInitialize = ({ user }: InitializeProps): null => {
  const initialize = useRef(false)
  if (!initialize.current) {
    useUserStore.setState({ state: { user } })
    initialize.current = true
  }

  return null
}
export default UserStoreInitialize
