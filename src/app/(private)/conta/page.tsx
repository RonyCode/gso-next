import { getServerSession } from 'next-auth'
import React from 'react'
import { LuUserCheck } from 'react-icons/lu'

import { EditProfileForm } from '@/app/(private)/conta/component/EditProfileForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllStates } from '@/lib/getAllStates'
import { GetUserById } from '@/lib/GetUserById'

const ProfileUser = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  const state = await getAllStates()
  const user = await GetUserById(session?.id)
  return (
    <>
      <CardDefault
        title="Minha Conta"
        description="Verifique | Atualize seus dados  "
        icon={<LuUserCheck size={28} />}
      >
        <EditProfileForm user={user} states={state} />
      </CardDefault>
    </>
  )
}
export default ProfileUser
