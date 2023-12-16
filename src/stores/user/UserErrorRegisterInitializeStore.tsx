'use client'

import { useRef } from 'react'

import { UserType } from '../../../types/index'
import { userErrorRegisterStore } from './userErrorRegisterStore'

type InitializeProps = {
  userError: UserType
}

const UserStoreInitialize = ({ userError }: InitializeProps) => {
  const initialize = useRef(false)
  if (!initialize.current) {
    userErrorRegisterStore.getState().add(userError)
    userErrorRegisterStore.setState({ user: userError })
    initialize.current = true
  }

  return null
}
export default UserStoreInitialize
