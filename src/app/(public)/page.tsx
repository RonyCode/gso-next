import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'

import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <div className="min-w-max">
          <h1>Server Session</h1>
          <pre>{'nome; ' + session?.nome}</pre>
          <pre>{'email: ' + session?.email}</pre>
          <pre>{'image: ' + session?.image}</pre>
          <pre>{'cod_usuario: ' + session?.cod_usuario}</pre>
        </div>
      </main>
    </>
  )
}
