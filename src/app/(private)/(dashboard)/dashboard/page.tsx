import { cookies } from 'next/headers'
import React from 'react'

const Dashboard = (): JSX.Element => {
  const subscriptionsUser = cookies().get('subscription')?.value
  return (
    <div className="m-auto h-full overflow-hidden md:container md:mx-auto">
      <br />

      <br />
    </div>
  )
}
export default Dashboard
