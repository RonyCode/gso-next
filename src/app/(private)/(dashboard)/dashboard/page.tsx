import React from 'react'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="m-auto h-full overflow-hidden md:container md:mx-auto">
      <br /> {session?.image}
      <br /> {session?.data_expirar_token}
      <br /> {session?.email}
      <br />
      {session?.email}
    </div>
  )
}
export default Dashboard
