import React from 'react'

import { stateStore } from '@/stores/Address/stateStore'
import StateStoreInitialize from '@/stores/Address/StateStoreInitialize'
import UserErrorRegisterInitializeStore from '@/stores/user/UserErrorRegisterInitializeStore'
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore'
import { useUserStore } from '@/stores/user/userStore'
import UserStoreInitialize from '@/stores/user/userStoreInitialize'
import { type AddressProps, type UserType } from '@/types/index'

const InitializeStores = (): JSX.Element => {
  const dataUserErro: UserType = userErrorRegisterStore.getState().user
  const dataStates: AddressProps[] = stateStore.getState().states
  const dataUser: UserType = useUserStore.getState().state.user

  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
      <StateStoreInitialize states={dataStates} />
      <UserStoreInitialize user={dataUser} />
      {/* <OrganizacaoStoreInitialize corporacao={dataOrganizacao} /> */}
    </>
  )
}

export default InitializeStores
