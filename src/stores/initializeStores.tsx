import React from 'react'

import UserErrorRegisterInitializeStore from '@/stores/user/UserErrorRegisterInitializeStore'
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore'
import StateStoreInitialize from '@/stores/Address/StateStoreInitialize'
import { stateStore } from '@/stores/Address/stateStore'

const InitializeStores = () => {
  const dataUserErro = userErrorRegisterStore.getState().user
  const dataStates = stateStore.getState().states
  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
      <StateStoreInitialize states={dataStates} />
    </>
  )
}

export default InitializeStores
