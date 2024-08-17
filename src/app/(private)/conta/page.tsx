import { getServerSession } from 'next-auth'
import React from 'react'
import { LuUserCheck } from 'react-icons/lu'

import { EditProfileForm } from '@/app/(private)/conta/component/EditProfileForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllStates } from '@/lib/getAllStates'
import { GetUserById } from '@/lib/GetUserById'

const ProfileUser = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  const state = await getAllStates()
  const user = await GetUserById(session?.id)

  const imgValided = await ImageExist(user?.account?.image)
  if (imgValided.status !== 200 && user.account?.image != null) {
    user.account.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }

  return (
    <>
      <CardDefault
        title={user?.account?.name}
        description={user?.userAuth?.email}
        image={user?.account?.image}
        imageMobile={user?.account?.image}
        icon={<LuUserCheck size={28} />}
      >
        <EditProfileForm user={user} states={state} />
      </CardDefault>
    </>
  )
}
export default ProfileUser
