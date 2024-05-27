'use client'

import { useRef } from 'react'

import { type UserType } from '../../../types/index'
import { userErrorRegisterStore } from './userErrorRegisterStore'

interface InitializeProps {
  userError: UserType
}

const UserStoreInitialize = ({ userError }: InitializeProps): null => {
  const initialize = useRef(false)
  if (!initialize.current) {
    userErrorRegisterStore.getState().add(userError)
    userErrorRegisterStore.setState({ user: userError })
    initialize.current = true
  }

  return null
}
export default UserStoreInitialize
