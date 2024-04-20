import React from 'react'
import { CardDefault } from '@/components/Cards/CardDefault'
import { EditProfileForm } from '@/app/(private)/conta/component/EditProfileForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllStates } from '@/lib/getAllStates'
import { GetUserById } from '@/lib/GetUserById'
import { LucideUserCheck } from 'lucide-react'

const ProfileUser = async () => {
  const session = await getServerSession(authOptions)
  const state = await getAllStates()
  const user = await GetUserById(session!.id!)
  return (
    <>
      <CardDefault
        title="Minha Conta"
        description="Verifique | Atualize seus dados  "
        icon={<LucideUserCheck size={28} />}
      >
        <EditProfileForm user={user} states={state} />
      </CardDefault>
    </>
  )
}
export default ProfileUser
