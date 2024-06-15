import React from 'react'

import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { stateStore } from '@/stores/Address/stateStore'
import StateStoreInitialize from '@/stores/Address/StateStoreInitialize'
import { organizacaoStore } from '@/stores/organizacoes/organizacaoStore'
import OrganizacaoStoreInitialize from '@/stores/organizacoes/organizacaoStoreinitialize'
import UserErrorRegisterInitializeStore from '@/stores/user/UserErrorRegisterInitializeStore'
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore'
import { useUserStore } from '@/stores/user/userStore'
import UserStoreInitialize from '@/stores/user/userStoreInitialize'
import { type AddressProps, type UserType } from '@/types/index'

const InitializeStores = (): JSX.Element => {
  const dataUserErro: UserType = userErrorRegisterStore.getState().user
  const dataStates: AddressProps[] = stateStore.getState().states
  const dataUser: UserType = useUserStore.getState().state.user
  const dataOrganizacao: IOrganizacaoSchema[] =
    organizacaoStore.getState().state.organizacao
  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
      <StateStoreInitialize states={dataStates} />
      <UserStoreInitialize user={dataUser} />
      {/* <OrganizacaoStoreInitialize organizacao={dataOrganizacao} /> */}
    </>
  )
}

export default InitializeStores
