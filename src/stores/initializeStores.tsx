import React from 'react'

import UserErrorRegisterInitializeStore from '@/stores/user/UserErrorRegisterInitializeStore'
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore'
import StateStoreInitialize from '@/stores/Address/StateStoreInitialize'
import { stateStore } from '@/stores/Address/stateStore'
import UserStoreInitialize from '@/stores/user/userStoreInitialize'
import { useUserStore } from '@/stores/user/userStore'

const InitializeStores = () => {
  const dataUserErro = userErrorRegisterStore.getState().user
  const dataStates = stateStore.getState().states
  const dataUser = useUserStore.getState().state.user
  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
      <StateStoreInitialize states={dataStates} />
      <UserStoreInitialize user={dataUser} />
    </>
  )
}

export default InitializeStores
