import { getServerSession } from 'next-auth'
import { type ReactNode } from 'react'

import { authOptions } from '@/lib/auth'

const Users = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions)

  return (
    <>
      <section>
        <div>
          <h1>Essa página é protegida</h1>
          <h2>Logado no sistema como:</h2>
          <p>{session?.id}</p>
          <p>{session?.nome}</p>
          <p>{session?.email}</p>
        </div>
      </section>
    </>
  )
}
export default Users
