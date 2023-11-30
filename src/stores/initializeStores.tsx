import React from 'react';

import UserErrorRegisterInitializeStore from '@/stores/user/UserErrorRegisterInitializeStore';
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore';

const InitializeStores = () => {
  const dataUserErro = userErrorRegisterStore.getState().user;
  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
    </>
  );
};

export default InitializeStores;
